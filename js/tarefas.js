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
    mes ="0"+mes
    data_atual = ano+"-"+mes+"-"+dia

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

  //Muda o formato da data do input do usuário 

  let anoinput = dataInput.value.slice(0,4);
  let mesinput = dataInput.value.slice(5,7);
  let diainput = dataInput.value.slice(8);
  let datavalida;  

  let datalimite = diainput+"-"+mesinput+"-"+anoinput
  
  //Valida o input da data
  if(anoinput > ano)
    datavalida = true;
  else if(mesinput > mes && anoinput>= ano)
    datavalida = true;
  else if(diainput >= dia && mesinput >= mes && anoinput>= ano)  
    datavalida = true;
    else
    datavalida = false;



   
    if(todoInput.value!=0 && todoInput.value.length>=10 && datavalida){   

        let numeroId = Math.random()   
        
        let objInfo ={
            id: numeroId,
            tarefa: todoInput.value,
            data: datalimite,
            completed: false
        }
        
        
        //cria as listas e adiciona tarefas com no mínimo 10 caracteres
        const newTodo = document.createElement("li")
        newTodo.setAttribute('id', numeroId)
        newTodo.classList.add("todo-item")
        
        // add todo para o local storage
        saveLocalTodos(objInfo)

        // icone antes da caixa de descrição
        const icontask = document.createElement("img")
        icontask.src="./assets/relozo.png"
        icontask.classList.add("icon-task")

        //div que contem a data limite e o texto da tarefa
        const divInfo = document.createElement("div")
        divInfo.classList.add("divInfo")

        //Caixa de descrição
        const descricao = document.createElement("div") 
        descricao.classList.add("descricao")

        //div que contem as tags p "Data limite" e "Conteudo da data"
        const containerData = document.createElement("containerData")
        containerData.classList.add("containerData")

        //Tag p para texto da tarefa
        const textoTarefa = document.createElement("p")
        textoTarefa.classList.add("texto")
        textoTarefa.innerText=todoInput.value

        //Tag p "Data limite"
        const textoLimite = document.createElement("p")
        textoLimite.innerText="Data limite :"

        //Tag p "Conteudo da data"
        const conteudoData = document.createElement("p")
        conteudoData.innerText = datalimite   



        newTodo.appendChild(icontask)
        divInfo.appendChild(textoTarefa)
        divInfo.appendChild(containerData)
        containerData.appendChild(textoLimite)
        containerData.appendChild(conteudoData)
        descricao.appendChild(divInfo)
        newTodo.appendChild(descricao)

        // div que contem os buttons
        const divButtons = document.createElement("div")
        divButtons.classList.add("divButtons")

        descricao.appendChild(divButtons)

        //check mark button
        const completedButton = document.createElement("img")
        completedButton.src = "./assets/check-mark-8-32.png"
        completedButton.classList.add("complete-btn")
        divButtons.appendChild(completedButton)
  
        //check trash button
        const trashButton = document.createElement("img")
        trashButton.src = "./assets/x-mark-5-32.png"
        trashButton.classList.add("trash-btn")
        divButtons.appendChild(trashButton)
        //append to lisst
        todoList.appendChild(newTodo)
        //clear todo input value
        todoInput.value=""

    } 
    else if(todoInput.value= 0 || todoInput.value.length<10 && datavalida != true) {
        alert("Digita uma tarefa com no mínimo 10 caracteres e escolha uma data limite futura")
        todoInput.value=""
    }
    else if(!datavalida){
        alert("Escolha uma data que esteja no futuro")
        todoInput.value=""
    }
    else{
        alert("Digite uma tarefa válida com no mínimo 10 caracteres");
        todoInput.value=""
           
}
}

function deleteCheck(e) {
    item = e.target    
    //delete todo
    if (item.classList[0]==="trash-btn") {
        let todo=item.parentElement.parentElement.parentElement
        //animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend",function () {
            todo.remove()
        })
    }
    //check mark
    let todoarray = JSON.parse(localStorage.getItem("todos"))
    if (item.classList[0]==="complete-btn") {
        let todo=item.parentElement.parentElement.parentElement
        todo.classList.toggle("completed")
        if(!todo.classList.contains("completed"))
            todoarray.forEach(function(el){
                if(el.id ==todo.id)
                el.completed = false;
                localStorage.setItem("todos",JSON.stringify(todoarray))
                
            }
            )


        else if(todo.classList.contains("completed")){
            todoarray.forEach(function(el){
                if(el.id==todo.id)
                el.completed = true;
                localStorage.setItem("todos",JSON.stringify(todoarray))
            })
        }    

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
        newTodo.setAttribute('id', todo.id)
        newTodo.classList.add("todo-item")
        if(todo.completed){
            newTodo.classList.add("completed")
        }
        //div que contem a data limite e o texto da tarefa
        const divInfo = document.createElement("div")
        divInfo.classList.add("divInfo")
 
        //Caixa de descrição
        const descricao = document.createElement("div") 
        descricao.classList.add("descricao")
 
        //div que contem as tags p "Data limite" e "Conteudo da data"
        const containerData = document.createElement("containerData")
        containerData.classList.add("containerData")
 
        //Tag p para texto da tarefa
        const textoTarefa = document.createElement("p")
        textoTarefa.classList.add("texto")
        textoTarefa.innerText=todo.tarefa
 
        //Tag p "Data limite"
        const textoLimite = document.createElement("p")
        textoLimite.innerText="Data limite :"
 
        //Tag p "Conteudo da data"
        const conteudoData = document.createElement("p")
        conteudoData.innerText = todo.data   
 
 
 
         newTodo.appendChild(icontask)
         divInfo.appendChild(textoTarefa)
         divInfo.appendChild(containerData)
         containerData.appendChild(textoLimite)
         containerData.appendChild(conteudoData)
         descricao.appendChild(divInfo)
         newTodo.appendChild(descricao)

        // div que contem os buttons
        const divButtons = document.createElement("div")
        divButtons.classList.add("divButtons")

        descricao.appendChild(divButtons)

        //check mark button
        const completedButton = document.createElement("img")
        completedButton.src = "./assets/check-mark-8-32.png"
        completedButton.classList.add("complete-btn")
        divButtons.appendChild(completedButton)
  
        //check trash button
        const trashButton = document.createElement("img")
        trashButton.src = "./assets/x-mark-5-32.png"
        trashButton.classList.add("trash-btn")
        divButtons.appendChild(trashButton)
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
