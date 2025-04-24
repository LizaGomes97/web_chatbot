// Funções relacionadas às animações e comportamentos do avatar

// Função para atualizar o balão de fala
function updateSpeechBubble(text, withTyping = true) {
  if (withTyping) {
    // Adiciona os pontos de "pensando"
    speechBubble.innerHTML =
      '<div class="thinking-dots"><span>.</span><span>.</span><span>.</span></div>';

    // Simula digitação após um breve "pensamento"
    setTimeout(() => {
      speechBubble.textContent = "";
      let i = 0;
      const speed = 50; // velocidade de digitação

      function typeWriter() {
        if (i < text.length) {
          speechBubble.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        } else {
          // Foca no campo de resposta após terminar de digitar
          setTimeout(() => {
            userInput.focus();
          }, 500);
        }
      }

      typeWriter();
    }, 1000);
  } else {
    speechBubble.textContent = text;
    setTimeout(() => {
      userInput.focus();
    }, 500);
  }
}

// Adicionar interatividade ao avatar
avatar.addEventListener("click", () => {
  const reactions = [
    "Clicou em mim! Precisa de alguma coisa?",
    "Oi! Estou aqui para ajudar!",
    "Pode me perguntar qualquer coisa!",
    "Gostando da conversa?",
    "Estou aqui para bater um papo!",
  ];
  const randomReaction =
    reactions[Math.floor(Math.random() * reactions.length)];
  updateSpeechBubble(randomReaction);
});
