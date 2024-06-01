const form = document.querySelector('.block_top');
const ul = document.querySelector('.ul__block_content');
const input = document.querySelector('.text');
const btnDeleteAll = document.querySelector('.btn__delete_everything'); // Удалить все
const btnDeleteComplete = document.querySelector('.btn__delete'); // Удалить завершённые
const blockEnd = document.querySelector('.block_end');

let localArr = [];

btnDeleteComplete.addEventListener('click', function(){
    let checkedItems = document.querySelectorAll('.check');
    checkedItems.forEach(el => el.parentElement.parentElement.remove());
});

form.addEventListener('submit', function(event){
    event.preventDefault(); // Отменяем дефолтное поведение. Отменить перезагрузку страницы для формы
    if(input.value) {
        let id = new Date
        id = id.getTime()
        addTask(input.value, id);
        localArr.push({
            textTask: input.value,
            isDone: false,
            idTask: id
        });
        localStorage.setItem('toDoList', JSON.stringify(localArr));
        input.value = ''; // Возвращает пустое поле в input
    }
});

function addTask(text, id, isDone) {
    blockEnd.classList.remove('d-none');
    let task = document.createElement('li');
    task.innerHTML = `
    <div class="checkbox__input">
    <input class="input__text_1 ${(isDone) ? 'check' : ''}" id="${id}"type="checkbox" ${(isDone) ? 'checked' : ''}> 
    <label class="checkbox__label" for="${id}">
        ${text}
    </label> 
    </div>
    <button class="btn_x">
        <img src="./icons/btn.png" alt="X">
    </button>`
    ul.append(task);

    deleteTask(task);
    checkTask(task);
    localStorage.setItem('id', 'task');
}

// Удаляет красный крестик
function deleteTask(task){
    let close = task.querySelector('.btn_x');
    close.addEventListener('click', function(){
        let id = task.querySelector('.input__text_1').id;
        localArr = localArr.filter(el => el.idTask !== +id); // + id превращает из строки в число 
        localStorage.setItem('toDoList', JSON.stringify(localArr)); // Перезапись localStorage
        task.remove()
        if(localArr.length < 1) {
            blockEnd.classList.add('d-none');
        } 
    });
}

// Меняем статус задачи сделано - не сделано
function checkTask(task){
    let check = task.querySelector('.input__text_1');
    let id = task.querySelector('.input__text_1').id;
    let test = localArr.find(el => el.idTask == +id); // + id превращает из строки в число
    check.addEventListener('click', function(){
        check.classList.toggle('check'); // Добавляем класс check ( это перечёркивание текста )
        test.isDone = !test.isDone; // Меняем состояния на обратное значение
        localStorage.setItem('toDoList', JSON.stringify(localArr)); // Перезапись localStorage
    });
};

// Удалить все
btnDeleteAll.addEventListener('click', function(){
    ul.innerHTML = '';
    localArr = [];
    localStorage.clear();
    blockEnd.classList.add('d-none');
})

btnDeleteComplete.addEventListener('click', function(){
    localArr = localArr.filter(el => el.isDone === false);
    localStorage.setItem('toDoList', JSON.stringify(localArr)); // Перезапись localStorage
})

if(localStorage.getItem('toDoList')) {
    localArr = JSON.parse(localStorage.getItem('toDoList'));
    localArr.forEach(el => addTask(el.textTask, el.idTask, el.isDone));
}





