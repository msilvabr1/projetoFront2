let body = document.querySelector('body');

let toggle = document.querySelector('#toggle');
toggle.addEventListener("click", function(){
    body.classList.toggle('dark');
});

(function getDate() {
    let dataAtual = new Date();
    let mes = dataAtual.getMonth() + 1; // January is month 0
    let dia = dataAtual.getDate();
    let ano = dataAtual.getFullYear();
  
    // pegando o elemento para aparecer a data
    var display_date = document.getElementById("display-date");
    // append date to element
    display_date.innerHTML =
      dia +
      "/" +
      mes +
      "/" +
      ano;
  })();


//?Selector
const todoInput=document.querySelector(".todo-input")
const dataInput=document.querySelector(".date-input")
const todoButton=document.querySelector(".todo-button")
const todoList=document.querySelector(".todo-list")
const filterOption=document.querySelector(".filter-todo")

//Pegando a data do sistema e colocando a data atual como a mínima
//possível na seleção

let date = new Date();
//Converte a data e hora para o fuso de São Paulo
date.toLocaleString("pt-BR", {timeZone: 'America/Sao_Paulo' })

console.log(date)

let dia = date.getDate();
let mes = 1 + date.getMonth();
let ano = date.getFullYear();
let data_atual
if( mes >= 10){
    data_atual=ano+"-"+mes+"-"+dia
}else
    data_atual = ano+"-"+"0"+mes+"-"+dia

console.log(data_atual)

dataInput.value = data_atual;
dataInput.min = data_atual;


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

  //cria as listas e adiciona tarefas com no mínimo 10 caracteres
    const newTodo = document.createElement("li")
    newTodo.classList.add("todo-item")
    //newTodo.innerText=todoInput.value

    if(todoInput.value!=0 && todoInput.value.length>=10){   

        // icone antes da caixa de descrição
        const icontask = document.createElement("img")
        icontask.src="./assets/relozo.png"
        icontask.classList.add("icon-task")
        

        
        // add todo para o local storage
        saveLocalTodos(todoInput.value)

        //Caixa de descrição
        const descricao = document.createElement("div") 
        descricao.classList.add("descricao")
        

        //Tag p para texto da tarefa
        const textoTarefa = document.createElement("p")
        textoTarefa.classList.add("texto")
        textoTarefa.innerText=todoInput.value

        newTodo.appendChild(icontask)
        descricao.appendChild(textoTarefa)
        newTodo.appendChild(descricao)

        //check mark button
        const completedButton = document.createElement("button")
        completedButton.innerHTML = "<i class='fas fa-check'></i>"
        completedButton.classList.add("complete-btn")
        descricao.appendChild(completedButton)
  
        //check trash button
        const trashButton = document.createElement("button")
        trashButton.innerHTML = "<i class='fas fa-trash'></i>"
        trashButton.classList.add("trash-btn")
        descricao.appendChild(trashButton)
        //append to lisst
        todoList.appendChild(newTodo)
        //clear todo input value
        todoInput.value=""

    } else {
        alert("Digite uma tarefa válida com no mínimo 10 caracteres");
           
}
}

function deleteCheck(e) {
    item = e.target    
    //delete todo
    if (item.classList[0]==="trash-btn") {
        let todo=item.parentElement
        todo= todo.parentElement
        //animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend",function () {
            todo.remove()
        })
    }
    //check mark
    if (item.classList[0]==="complete-btn") {
        let todo=item.parentElement
        todo= todo.parentElement
        todo.classList.toggle("completed")
    }
}

//Tive que colocar esse if  (index != 0), em FilterTodo, pois o primeiro elemento, o de indice 0, da NodeList
//"todos" é uma string vazia que é gerada junto com o card das atividades, ou seja,
// ela também é um childnode. Não entendi o que faz ela aparecer no html - Arthur

function filterTodo(e) {
    let todos = todoList.childNodes
    console.log(todos)
    todos.forEach(function(todo,index){
        console.log(todo);
        if(index != 0){
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
        // icone antes da caixa de descrição
        const icontask = document.createElement("img")
        icontask.src="assets/relozo.png"
        icontask.classList.add("icon-task")
               
        //create LI
        const newTodo = document.createElement("li")
        newTodo.classList.add("todo-item")
        //Caixa de descrição
        const descricao = document.createElement("div") 
        descricao.classList.add("descricao")
        //Tag p para texto da tarefa
        const textoTarefa = document.createElement("p")
        textoTarefa.classList.add("texto")
        textoTarefa.innerText=todo

        newTodo.appendChild(icontask)
        descricao.appendChild(textoTarefa)
        newTodo.appendChild(descricao)

        //check mark button
        const completedButton = document.createElement("button")
        completedButton.innerHTML = "<i class='fas fa-check'></i>"
        completedButton.classList.add("complete-btn")
        descricao.appendChild(completedButton)
        //check trash button
        const trashButton = document.createElement("button")
        trashButton.innerHTML = "<i class='fas fa-trash'></i>"
        trashButton.classList.add("trash-btn")
        descricao.appendChild(trashButton)
         //append to lisst
        todoList.appendChild(newTodo)
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
