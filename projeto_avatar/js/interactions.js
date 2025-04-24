// Funções para interação com o usuário

// Capturar input do usuário
userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const message = userInput.value.trim();

  if (message) {
    if (!conversationStarted) {
      userName = message;
      userInput.value = "";

      // Pequena animação do avatar reagindo
      avatar.style.transform = "scale(1.2)";
      setTimeout(() => {
        avatar.style.transform = "";
      }, 300);

      setTimeout(() => {
        updateSpeechBubble(
          `Prazer em conhecê-lo, ${userName}! Como posso ajudar você hoje?`
        );
        conversationStarted = true;
        userInput.placeholder = "Digite sua mensagem...";
        userInput.focus();
      }, 500);
    } else {
      userInput.value = "";

      // Pequena animação do avatar reagindo
      avatar.style.transform = "scale(1.1)";
      setTimeout(() => {
        avatar.style.transform = "";
      }, 300);

      // Simular resposta do chatbot
      setTimeout(() => {
        updateSpeechBubble(
          `Você disse: "${message}". Esta é uma resposta de demonstração.`
        );
      }, 800);
    }
  }
});
