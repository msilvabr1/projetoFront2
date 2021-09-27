let count = 0;

const api = fetch('https://jsonplaceholder.typicode.com/todos/');

let goahead = _ =>{
produto=api.then(res => res.clone().json()).then(json => {
  const body = document.querySelector("body")
  body.innerHTML = 
  `<script src="./js/cadastroTarefas.js"></script>
  <button type="submit" class="btn" id="enviar" onclick="goahead();">Card</button>
  <br>
  `;
  json.map(produto => {
    if(produto.completed&&produto.id<=count){
    let card = `
      <div class="card2">
        <img src="./assets/img_avatar2.png" alt="Avatar" style="width:100%">
        <div class="container2">
          <h3>${produto.userId}</h3>
          <strong>${produto.id}</strong>
          <p><del>${produto.title}</del></p>
          <p>${produto.completed}</p>
        </div>
      </div>
    `;
    
    body.innerHTML += card;
    }
      if(!produto.completed&&produto.id<=count){
        let card = `
        <div class="card2">
        <img src="./assets/img_avatar.png" alt="Avatar" style="width:100%">
        <div class="container2">
          <h3>${produto.userId}</h3>
          <strong>${produto.id}</strong>
          <p><strong>${produto.title}</strong></p>
          <p>${produto.completed}</p>
        </div>
      </div>
        `;
        
        body.innerHTML += card;
    }
  });
});
count++;
}
