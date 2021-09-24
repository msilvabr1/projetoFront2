// const api = fetch('https://jsonplaceholder.typicode.com/todos/');

// api.then(res => res.json()).then(json => {
//   const body = document.querySelector("body");
//   json.map(produto => {
//     let card = `
//       <div class="card">
//         <h3>${produto.userId}</h3>
//         <strong>${produto.id}</strong>
//          <p>${produto.title}"</p>
//         <p>${produto.completed}</p>
//       </div>
//     `;

//     body.innerHTML += card;
//   });
// });

// let createCard = () => {
//   //TITLE AND DRESCRIPTION CREATION
//   const title = document.createElement('h2');
//   const description = document.createElement('p');
//   title.textContent = document.querySelector('#titulo').value.toUpperCase();
//   description.textContent = capitalizeFirstLetter(document.querySelector('#descricao').value);
//   // //URL GATHERING
//   // const imgUrl = document.querySelector('#url-imagem').value;
//   // //IMG CREATION
//   // const newImg = document.createElement('img');
//   // newImg.src = imgUrl;
//   // newImg.alt = 'Imagem do card';
//   // newImg.classList.add('img-fluid');
//   // APPEND SECTION
//   const imgCol = document.createElement('div');
//   imgCol.classList.add('col-md-6', 'col-sm-12', 'gx-5', 'gy-4');
//   imgCol.appendChild(title);
//   imgCol.appendChild(newImg);
//   imgCol.appendChild(description);
//   imgRow.appendChild(imgCol);
// }

//Função para a criação de cards
// let elements = 0
// let titulo = ""
// let descricao = ""
// let acao = ""
// let json = {
//     'id': [],
//     'titulo': [],
//     'descricao': [],
//     'acao': []
// }

// function createCard() {
//     titulo = document.getElementById("titulo").value
//     descricao = document.getElementById("descricao").value
//     acao = document.getElementById("acao").value


//     var cardSection = document.getElementById("card")
//     cardSection.innerHTML += `<div> <h1>"${titulo}"</h1>
//                                     <h2>${descricao}</h2>
//                                     <p>${acao}<p> </div>`

//     //let json = `{"imagem":"${urlImg}", "titulo":"${title}"}`

//     //arrObj.push(urlImg)
//     //arrObj.push(title)
//     json.titulo.push(titulo)
//     json.descricao.push(descricao)
//     json.acao.push(acao)
//     console.log(json)

//     //localStorage.setItem('imagem', urlImg)
//     //localStorage.setItem('titulo', title)

//     json = JSON.stringify(json) //Convertendo em JSON
//     console.log(json)
//     localStorage.setItem('json', json)
//     json = JSON.parse(json)
// }

// window.onload = function() {
//     //let imagem = localStorage.getItem('imagem')
//     //let titulo = localStorage.getItem('titulo')

//     let obj = localStorage.getItem('json')
//     obj = JSON.parse(obj)
//     console.log(obj)
//         //console.log(arr)

//     for (elements in obj.acao) {
//         let cardSection = document.getElementById("card");
//         cardSection.innerHTML += `<div> <p>${obj.acao[elements]}"</p> 
//                                             <h2>${obj.titulo[elements]}</h2></div>`;

//         json.titulo.push(obj.titulo[elements])
//         json.acao.push(obj.acao[elements])
//     }
// }

 
// function criar(){
//   var p=document.createElement('div')
//   p.textContent=""
//   p.style.color='white'
//   p.style.backgroundColor='blue'
//   p.style.padding='15px'
//   p.style.margin='15px'
//   p.style.marginLeft='390px'
//   p.style.marginRight='-356px'

  
  
//   var cx=document.querySelector('div')
//   cx.appendChild(p)
// }

const api = fetch('https://jsonplaceholder.typicode.com/todos/');

produto=api.then(res => res.json()).then(json => {
  const body = document.querySelector("body");
  json.map(produto => {
    let card = `
      <div class="card">
        <h3>${produto.userId}</h3>
        <strong>${produto.id}</strong>
         <p>${produto.title}"</p>
        <p>${produto.completed}</p>
      </div>
    `;

    body.innerHTML += card;
  });
});


