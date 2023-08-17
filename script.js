let list = document.querySelector('.todo-list'); 
let completeList = document.querySelector('.completed .todo-list')
let message = document.querySelector('.empty-tasks'); 
let addForm = document.querySelector('.add-form'); 
let descriptionTask = document.querySelector('.add-form-input');
let tasks = [];

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach((task) => renderTask(task));
}
 
showMessage();

addForm.addEventListener('submit', AddTask);
list.addEventListener('click', DeleteTask);
list.addEventListener('click', editTask);
list.addEventListener('click', completedTask);
completeList.addEventListener('click', editTask);
completeList.addEventListener('click', DeleteTask);
completeList.addEventListener('click', completedTask);

function AddTask (evt) {
    evt.preventDefault();

    let textTask = descriptionTask.value;
    let objTask = {
        id: Date.now(),
        text: textTask,
        done: false,
    }
    
    tasks.push(objTask);
	localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTask(objTask);
	descriptionTask.value = '';
    showMessage();
}

function showMessage() {
    if (tasks.length === 0) {
        message.classList.remove('hidden');
    }
    else {
        message.classList.add('hidden');
    }
}

function DeleteTask (evt) {
    if (evt.target.dataset.action !== 'delete') return;

    const item = evt.target.closest('.todo-list-item');
    const iditem = Number(item.id);
    const i = tasks.findIndex ((item) => item.id === iditem);

    tasks.splice (i, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    item.remove();

    showMessage();
}
 
function renderTask (task) {
    const classTask = task.done ? 'todo-list-item checked' : 'todo-list-item';

    const templateTask = ` <li id="${task.id}" class="${classTask}">
    <label>
      <input type="checkbox" data-action="done"  class="todo-list-input">
      <span>${task.text}</span>
      
      <input class="edit-inp" type="text">
    </label>
    <span class="edit"><img src="img/edit.png" data-action="edit" alt="" width="25px"></span>
    <span class="close"><img src="img/delete.png" data-action="delete" width="25px"></span>
  </li>` ;
        if ( task.done === false){
            list.insertAdjacentHTML('beforeend', templateTask);
        } else {
        completeList.insertAdjacentHTML('beforeend', templateTask);
        }

}

function editTask (evt) {
    if (evt.target.dataset.action !== 'edit') return;
    const item = evt.target.closest('.todo-list-item');
    const idItem = Number(item.id); 
    const task = tasks.find( (task) => task.id === idItem)
    let editinput=item.querySelector('.edit-inp');
    let taskDescription1 = item.querySelector('span');
       
        if (!item.classList.contains('edit-task')) {
            item.classList.add('edit-task');
            taskDescription1.classList.add('hidden');
            editinput.classList.add('show');
            editinput.value = task.text;
        } else {
            item.classList.remove('edit-task'); 
            taskDescription1.classList.remove('hidden');
            editinput.classList.remove('show');
            task.text = editinput.value;
            taskDescription1.textContent=task.text ;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
   
    showMessage();

}

function completedTask (evt) {
    if (evt.target.dataset.action !== 'done') return;

    const item = evt.target.closest('.todo-list-item');
    const idItem = Number(item.id); 
    const task = tasks.find( (task) => task.id === idItem)
    task.done = !task.done;

        if(task.done === true) {
            item.remove();
            completeList.append(item);
            item.classList.add('checked');
        } else {
            item.classList.remove('checked');
            item.remove();
            list.append(item);
  }
    localStorage.setItem('tasks', JSON.stringify(tasks));
} 
 