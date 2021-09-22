let body = document.querySelector('body');

let toggle = document.querySelector('#toggle');
toggle.addEventListener("click", function(){
    body.classList.toggle('dark');
});

//?Selector
const todoInput=document.querySelector(".todo-input")
const todoButton=document.querySelector(".todo-button")
const todoList=document.querySelector(".todo-list")
const filterOption=document.querySelector(".filter-todo")


//?Event listeners
window.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click",addTodo)
todoList.addEventListener("click",deleteCheck)
filterOption.addEventListener("click",filterTodo)

//*Funções
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault()
    //todo DIV
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    //cria as listas
    const newTodo = document.createElement("li")
    newTodo.innerText=todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    // add todo para o local storage
    saveLocalTodos(todoInput.value)

    //check mark button
    const completedButton = document.createElement("button")
    completedButton.innerHTML = "<i class='fas fa-check'></i>"
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)

    //check trash button
    const trashButton = document.createElement("button")
    trashButton.innerHTML = "<i class='fas fa-trash'></i>"
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)
    //append to lisst
    todoList.appendChild(todoDiv)
    //clear todo input value
    todoInput.value=""
}

function deleteCheck(e) {
    item = e.target    
    //delete todo
    if (item.classList[0]==="trash-btn") {
        const todo=item.parentElement
        //animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend",function () {
            todo.remove()
        })
    }
    //check mark
    if (item.classList[0]==="complete-btn") {
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }
}
function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function(todo){
        console.log(todo);
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                } 
                break
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                } 
                break
        }
    })
}
function saveLocalTodos(todo) {
    //check
    let todos
    if (localStorage.getItem("todos")=== null) {
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
}
function getTodos() {
    let todos
    //check
    if (localStorage.getItem("todos")=== null) {
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    } 
    todos.forEach(function(todo) {
         //todo DIV
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")
        //create LI
        const newTodo = document.createElement("li")
        newTodo.innerText=todo
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo)
        //check mark button
        const completedButton = document.createElement("button")
        completedButton.innerHTML = "<i class='fas fa-check'></i>"
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton)
        //check trash button
        const trashButton = document.createElement("button")
        trashButton.innerHTML = "<i class='fas fa-trash'></i>"
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton)
        //append to lisst
        todoList.appendChild(todoDiv)
    })

    
}
function removeLocalTodos(todo) {
    let todos
    //check
    if (localStorage.getItem("todos")=== null) {
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    } 
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos))
}
