let body = document.querySelector('body');

//Função para criar o botão de Dark Mode
let toggle = document.querySelector('#toggle');
toggle.addEventListener("click", function () {
    body.classList.toggle('dark');
});


//Selector
const todoInput = document.querySelector(".todo-input")
const dataInput = document.querySelector(".date-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")


//Pegando a data do sistema e colocando a data atual como a mínima
//possível na seleção

let date = new Date();

//Converte a data e hora para o fuso de São Paulo
date.toLocaleString("pt-BR", {
    timeZone: 'America/Sao_Paulo'
})

let dia = date.getDate();
let mes = 1 + date.getMonth();
let ano = date.getFullYear();
let data_atual

 if(mes < 10 && dia < 10){
    mes = "0" + mes
    dia = "0" + dia
 }else if(mes < 10){
    mes = "0" + mes
 }else if (dia <10) 
    dia = "0" + dia

data_atual = ano + "-" + mes + "-" + dia

console.log(data_atual)

dataInput.value = data_atual;
dataInput.min = data_atual;


// pegando o elemento para aparecer a data
var display_date = document.getElementById("display-date");
// append date to element
display_date.innerHTML = dia + "/" + mes + "/" + ano;


//Event listeners
window.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)


//Funções
//Variavel para função dataValidator
let datalimite

function dataValidator(dataElemento, dataArmazenada) {

    //A data armazenada usa uma estrutura diferente na função da data ainda nao armazenda, 
    //pois a data armazenada ja foi formatada

    if (dataArmazenada) {
        let diainput = dataElemento.slice(0, 2);
        let mesinput = dataElemento.slice(3, 5);
        let anoinput = dataElemento.slice(6);
        let datavalida;

        if (anoinput > ano)
            datavalida = true;
        else if (mesinput > mes && anoinput >= ano)
            datavalida = true;
        else if (diainput >= dia && mesinput >= mes && anoinput >= ano)
            datavalida = true;
        else
            datavalida = false;
        return datavalida
    } else {
        let anoinput = dataElemento.slice(0, 4);
        let mesinput = dataElemento.slice(5, 7);
        let diainput = dataElemento.slice(8);
        let datavalida;

        if (anoinput > ano)
            datavalida = true;
        else if (mesinput > mes && anoinput >= ano)
            datavalida = true;
        else if (diainput >= dia && mesinput >= mes && anoinput >= ano)
            datavalida = true;
        else
            datavalida = false;

        //Muda o formato da data do input do usuário 
        if (datavalida)
            datalimite = diainput + "-" + mesinput + "-" + anoinput


        return datavalida
    }
}

//funcao de todos os elementos
function addTodo(event) {

    //prevent form from submitting
    event.preventDefault()

    console.log(dataInput.value)
    if (todoInput.value != 0 && todoInput.value.length >= 10 && dataValidator(dataInput.value)) {

        let numeroId = Math.random()

        let objInfo = {
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
        icontask.src = "./assets/relozo.png"
        icontask.classList.add("icon-task")

        //div que contem a data limite e o texto da tarefa
        const divInfo = document.createElement("div")
        divInfo.classList.add("divInfo")

        //Caixa de descrição
        const descricao = document.createElement("div")
        descricao.classList.add("descricao")

        //div que contem as tags p "Data limite" e "Conteudo da data"
        const containerData = document.createElement("div")
        containerData.classList.add("containerData")

        //Tag p para texto da tarefa
        const textoTarefa = document.createElement("p")
        textoTarefa.classList.add("texto")
        textoTarefa.innerText = todoInput.value

        //Tag p "Data limite"
        const textoLimite = document.createElement("p")
        textoLimite.innerText = "Data limite :"

        //Tag p "Conteudo da data"
        const conteudoData = document.createElement("p")
        conteudoData.innerText = datalimite
        conteudoData.setAttribute('class', "conteudo-data")

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
        todoInput.value = ""

    } else if (todoInput.value = 0 || todoInput.value.length < 10 && !dataValidator(dataInput.value)) {
        alert("Digita uma tarefa com no mínimo 10 caracteres e escolha uma data limite no dia atual/no futuro")
        todoInput.value = ""
    } else if (!dataValidator(dataInput.value)) {
        alert("Escolha uma data que esteja no dia de hoje ou no futuro")
        todoInput.value = ""
    } else {
        alert("Digite uma tarefa válida com no mínimo 10 caracteres");
        todoInput.value = ""

    }
}
    // função que deleta as tarefas do card  
    function deleteCheck(e) {
    item = e.target
    let todo
    //delete todo

    if (item.classList[0] === "trash-btn") {

        if (confirm('Tem certeza que deseja excluir essa tarefa?')) {

            //Estrutura para acessar o elemento html especifico com a classe "todo-item", que é o container pai da tarefa,
            //apartir do botão que levou o click: "item = e.target"
            // Antes estava "todo = item.parentElement.parentElement.ParentElement", com essa estrutura o código
            //fica muito mais funcional

            while (!item.parentElement.classList.contains("todo-item")) {
                item = item.parentElement
            }
            if (item.parentElement.classList.contains("todo-item"))
                item = item.parentElement

            todo = item
            //animation
            todo.classList.add("fall")
            removeLocalTodos(todo)
            todo.addEventListener("transitionend", function () {
                todo.remove()
            })

        }
    }

    //check mark
    let todoarray = JSON.parse(localStorage.getItem("todos"))
    if (item.classList[0] === "complete-btn") {

        while (!item.parentElement.classList.contains("todo-item")) {
            item = item.parentElement
        }
        if (item.parentElement.classList.contains("todo-item"))
            item = item.parentElement

        todo = item
        todo.classList.toggle("completed")

        if (!todo.classList.contains("completed"))
            todoarray.forEach(function (el) {
                if (el.id == todo.id)
                    el.completed = false;
            })


        else if (todo.classList.contains("completed")) {
            todoarray.forEach(function (el) {
                if (el.id == todo.id)
                    el.completed = true;
            })
        }

        localStorage.setItem("todos", JSON.stringify(todoarray))
    }
}

//Tive que colocar esse if  (index != 0), em FilterTodo, pois o primeiro elemento, o de indice 0, da NodeList
//"todos" é uma string vazia que (as vezes) é gerada junto com o card das atividades, ou seja,
// ela também é um childnode. Não entendi o que faz ela aparecer no html - Arthur


//função que mostra todos os elementos no card através do filtro 
function filterTodo(e) {
    let todos = todoList.childNodes
    console.log(todos)
    todos.forEach(function (todo, index) {
        console.log(todo);
        if (index != 0) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex"
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex"
                    } else {
                        todo.style.display = "none"
                    }
                    break
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex"
                    } else {
                        todo.style.display = "none"
                    }
                    break
            }
        }
    })
}

//salva os elementos
function saveLocalTodos(todo) {
    //check
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}


function getTodos() {
    let todos
    //check
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (todo) {
        // icone antes da caixa de descrição
        const icontask = document.createElement("img")
        icontask.src = "assets/relozo.png"
        icontask.classList.add("icon-task")

        //create LI
        const newTodo = document.createElement("li")
        newTodo.setAttribute('id', todo.id)
        newTodo.classList.add("todo-item")
        if (todo.completed) {
            newTodo.classList.add("completed")
        }
        //div que contem a data limite e o texto da tarefa
        const divInfo = document.createElement("div")
        divInfo.classList.add("divInfo")

        //Caixa de descrição
        const descricao = document.createElement("div")
        descricao.classList.add("descricao")

        //div que contem as tags p "Data limite" e "Conteudo da data"
        const containerData = document.createElement("div")
        containerData.classList.add("containerData")

        //Tag p para texto da tarefa
        const textoTarefa = document.createElement("p")
        textoTarefa.classList.add("texto")
        textoTarefa.innerText = todo.tarefa

        //Tag p "Data limite"
        const textoLimite = document.createElement("p")
        textoLimite.innerText = "Data limite :"

        //Tag p "Conteudo da data
        const conteudoData = document.createElement("p")
        conteudoData.innerText = todo.data
        conteudoData.setAttribute('class', "conteudo-data")


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

        //Se a tarefa salva tiver sido expirada
        if (!dataValidator(todo.data, true) && !todo.completed) {
            icontask.src = "assets/relozovermelho.png"
            completedButton.classList.add("expired")
            let textoLimite = document.createElement("p")
            textoLimite.setAttribute("class", "textoLimite")
            textoLimite.innerText = "A data limite foi atingida!"
            containerData.appendChild(textoLimite)
        }

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

//função que remove do local storage
function removeLocalTodos(todo) {
    let todos
    //check
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    } 
    console.log(todo.id)
    todos.forEach(function(el,indice){
        if(el.id == todo.id)
        todos.splice(indice,1)
        
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}