// Importar funções e estados do main.js
import {
  fadeToAction,
  setExpression,
  expressions,
  states,
  emotes,
} from "./main.js";

// Elementos do DOM
const speechBubble = document.getElementById("speech-bubble");
const avatarContainer = document.getElementById("avatar-container");

// Função para atualizar o balão de fala com efeito de digitação
function updateSpeechBubble(text, withTyping = true, mood = "neutral") {
  // Definir expressão facial baseada no humor
  switch (mood) {
    case "happy":
      setExpression("Happy", 1);
      break;
    case "sad":
      setExpression("Sad", 1);
      break;
    case "surprised":
      setExpression("Surprised", 1);
      break;
    case "angry":
      setExpression("Angry", 1);
      break;
    default:
      // Expressão neutra (reset)
      setExpression(null, 0);
  }

  if (withTyping) {
    // Adiciona os pontos de "pensando"
    speechBubble.innerHTML =
      '<div class="thinking-dots"><span>.</span><span>.</span><span>.</span></div>';

    // Animação "pensando"
    fadeToAction("Idle", 0.5);

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
          // Quando terminar de digitar, volta para Idle
          fadeToAction("Idle", 0.5);

          // Foca no campo de resposta
          setTimeout(() => {
            document.getElementById("user-input").focus();
          }, 500);
        }
      }

      // Animação "falando"
      fadeToAction("Wave", 0.3);

      typeWriter();
    }, 1000);
  } else {
    speechBubble.textContent = text;
    // Foca no campo de resposta
    setTimeout(() => {
      document.getElementById("user-input").focus();
    }, 500);
  }
}

// Adicionar interatividade ao avatar
avatarContainer.addEventListener("click", () => {
  const reactions = [
    {
      text: "Clicou em mim! Precisa de alguma coisa?",
      animation: "Wave",
      mood: "happy",
    },
    {
      text: "Oi gamer! Estou aqui para ajudar!",
      animation: "ThumbsUp",
      mood: "happy",
    },
    {
      text: "Pode me perguntar qualquer coisa sobre games!",
      animation: "Yes",
      mood: "neutral",
    },
    { text: "Gostando da conversa?", animation: "Jump", mood: "surprised" },
    {
      text: "Preparado para uma nova aventura?",
      animation: "Punch",
      mood: "happy",
    },
  ];

  const random = Math.floor(Math.random() * reactions.length);
  const reaction = reactions[random];

  // Definir expressão facial baseada no humor
  setExpression(
    reaction.mood === "happy"
      ? "Happy"
      : reaction.mood === "sad"
      ? "Sad"
      : reaction.mood === "surprised"
      ? "Surprised"
      : reaction.mood === "angry"
      ? "Angry"
      : null
  );

  // Executar animação
  fadeToAction(reaction.animation, 0.3);

  // Exibir texto
  updateSpeechBubble(reaction.text, true, reaction.mood);
});

export { updateSpeechBubble };
