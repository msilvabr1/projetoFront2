let count = 0;

const api = fetch('https://jsonplaceholder.typicode.com/todos/');

let goahead = _ => {


  produto = api.then(res => res.clone().json()).then(json => {
    var obj = JSON.parse(JSON.stringify(json));
    var length = Object.keys(obj).length;
    const body = document.querySelector("body")
    body.innerHTML =
      `<script src="./js/cadastroTarefas.js"></script>
     <button type="submit" class="redirecionamento" id="enviar" onclick="goahead();">Adicionar Card</button>
     <button type="submit" class="redirecionamento" id="enviar" onclick="goback();">Remover Card</button>
     <button type="submit" class="redirecionamento" id="enviar" onclick="allcards();">Carregar todos os Cards</button>
     <button type="submit" class="redirecionamento" id="enviar" onclick="removecards();">Remover todos os Cards</button>
  <br>
  `;
    json.map(produto => {
      if (produto.completed && produto.id <= count) {
        let card = `
      <div class="card2">
        <img src="./assets/img_avatar2.jpg" alt="Avatar" style="width:100%">
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
      if (!produto.completed && produto.id <= count) {
        let card = `
        <div class="card2">
        <img src="./assets/img_avatar.jpg" alt="Avatar" style="width:100%">
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
    if (count < length) count++
  });
}


let goback = _ => {
  produto = api.then(res => res.clone().json()).then(json => {
    const body = document.querySelector("body")
    body.innerHTML =
      `<script src="./js/cadastroTarefas.js"></script>
       <button type="submit" class="redirecionamento" id="enviar" onclick="goahead();">Adicionar Card</button>
      <button type="submit" class="redirecionamento" id="enviar" onclick="goback();">Remover Card</button>
      <button type="submit" class="redirecionamento" id="enviar" onclick="allcards();">Carregar todos os Cards</button>
      <button type="submit" class="redirecionamento" id="enviar" onclick="removecards();">Remover todos os Cards</button>
      <br>
    `;
    json.map(produto => {
      if (produto.completed && produto.id <= count) {
        let card = `
        <div class="card2">
          <img src="./assets/img_avatar2.jpg" alt="Avatar" style="width:100%">
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
      if (!produto.completed && produto.id <= count) {
        let card = `
          <div class="card2">
          <img src="./assets/img_avatar.jpg" alt="Avatar" style="width:100%">
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
  if (count == 0) {
    count = 0;
  } else count--;
}


let allcards = _ => {
  produto = api.then(res => res.clone().json()).then(json => {
    const body = document.querySelector("body")
    body.innerHTML =
      `<script src="./js/cadastroTarefas.js"></script>
      <button type="submit" class="redirecionamento" id="enviar" onclick="goahead();">Adicionar Card</button>
      <button type="submit" class="redirecionamento" id="enviar" onclick="goback();">Remover Card</button>
      <button type="submit" class="redirecionamento" id="enviar" onclick="allcards();">Carregar todos os Cards</button>
      <button type="submit" class="redirecionamento" id="enviar" onclick="removecards();">Remover todos os Cards</button>
      <br>
      `;
    json.map(produto => {
      if (produto.completed && produto.id) {
        let card = `
          <div class="card2">
            <img src="./assets/img_avatar2.jpg" alt="Avatar" style="width:100%">
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
      if (!produto.completed && produto.id) {
        let card = `
            <div class="card2">
            <img src="./assets/img_avatar.jpg" alt="Avatar" style="width:100%">
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
    count = 200;
  });
}

let removecards = _ => {
  const body = document.querySelector("body")
  body.innerHTML =
    `<script src="./js/cadastroTarefas.js"></script>
    <button type="submit" class="redirecionamento" id="enviar" onclick="goahead();">Adicionar Card</button>
    <button type="submit" class="redirecionamento" id="enviar" onclick="goback();">Remover Card</button>
    <button type="submit" class="redirecionamento" id="enviar" onclick="allcards();">Carregar todos os Cards</button>
    <button type="submit" class="redirecionamento" id="enviar" onclick="removecards();">Remover todos os Cards</button>
    <br>
        `;
  count = 0;
}