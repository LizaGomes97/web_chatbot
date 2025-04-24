// Elementos do DOM
const avatar = document.getElementById("avatar");
const speechBubble = document.getElementById("speech-bubble");
const userInput = document.getElementById("user-input");
const userForm = document.getElementById("user-form");

// Estado do chat
let userName = "";
let conversationStarted = false;

// Focar no campo de resposta após o carregamento da página e animação
setTimeout(() => {
  userInput.focus();
}, 3000);
