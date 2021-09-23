//verificacao de igualdade do campo senha no cadastro de conta

let senha = document.getElementById("senha")
let confirmaSenha = document.getElementById("senha1");

function validatePassword(){
  if(senha.value != confirmaSenha.value) {
    confirmaSenha.setCustomValidity("Senhas diferentes!");
  } else {
    confirmaSenha.setCustomValidity('');
  }
}

senha.onchange = validatePassword;
confirmaSenha.onkeyup = validatePassword;