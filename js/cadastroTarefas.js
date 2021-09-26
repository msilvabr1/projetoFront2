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


