// Importar funções do avatar.js
import { updateSpeechBubble } from "./avatar.js";
import { fadeToAction, setExpression } from "./main.js";

// Elementos do DOM
const userForm = document.getElementById("user-form");
const userInput = document.getElementById("user-input");

// Estado do chat
let userName = "";
let conversationStarted = false;

// Respostas relacionadas a jogos para tornar o chatbot mais temático
const gameResponses = [
  {
    text: "Você já jogou The Witcher 3? É um dos meus RPGs favoritos!",
    animation: "Yes",
    mood: "happy",
  },
  {
    text: "Você prefere jogos de console ou PC?",
    animation: "Idle",
    mood: "neutral",
  },
  {
    text: "Qual seu jogo favorito? Estou sempre procurando recomendações!",
    animation: "Jump",
    mood: "surprised",
  },
  {
    text: "Se você gosta de FPS, recomendo experimentar Valorant ou CS2.",
    animation: "ThumbsUp",
    mood: "happy",
  },
  {
    text: "Você conhece o Hollow Knight? É um metroidvania incrível!",
    animation: "Wave",
    mood: "happy",
  },
  {
    text: "Já ouviu falar do Among Us? É super divertido jogar com amigos!",
    animation: "Yes",
    mood: "happy",
  },
  {
    text: "Você já assistiu a algum campeonato de eSports?",
    animation: "Idle",
    mood: "neutral",
  },
  {
    text: "Minecraft continua sendo um dos jogos mais populares até hoje!",
    animation: "ThumbsUp",
    mood: "happy",
  },
  {
    text: "Você já tentou algum jogo VR? É uma experiência incrível!",
    animation: "Surprised",
    mood: "surprised",
  },
  {
    text: "Qual seu personagem de jogo favorito?",
    animation: "Idle",
    mood: "neutral",
  },
];

// Iniciar a conversa com uma introdução
setTimeout(() => {
  fadeToAction("Wave", 0.3);
  updateSpeechBubble(
    "Olá gamer! Sou seu assistente robótico. Qual seu nome ou nickname?",
    true,
    "happy"
  );
}, 1500);

// Capturar input do usuário
userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const message = userInput.value.trim();

  if (message) {
    if (!conversationStarted) {
      // Primeira interação - pegando o nome
      userName = message;
      userInput.value = "";

      // Animação de reação do robô
      fadeToAction("Jump", 0.3);
      setExpression("Happy");

      setTimeout(() => {
        updateSpeechBubble(
          `Prazer em conhecê-lo, ${userName}! Sou especialista em games. Como posso ajudar você hoje?`,
          true,
          "happy"
        );
        conversationStarted = true;
        userInput.placeholder = "Digite sua mensagem...";
        userInput.focus();
      }, 500);
    } else {
      userInput.value = "";

      // Verificar se a mensagem contém palavras-chave relacionadas a jogos
      const gameKeywords = [
        "jogo",
        "game",
        "play",
        "jogar",
        "console",
        "pc",
        "fps",
        "rpg",
        "moba",
        "mmorpg",
      ];
      const containsGameKeyword = gameKeywords.some((keyword) =>
        message.toLowerCase().includes(keyword)
      );

      // Escolher uma resposta temática ou genérica
      if (containsGameKeyword) {
        // Resposta temática de jogos
        const randomIndex = Math.floor(Math.random() * gameResponses.length);
        const response = gameResponses[randomIndex];

        // Animação "reagindo"
        fadeToAction(response.animation, 0.3);

        // Resposta
        setTimeout(() => {
          updateSpeechBubble(response.text, true, response.mood);
        }, 800);
      } else {
        // Resposta genérica
        fadeToAction("Idle", 0.3);

        setTimeout(() => {
          updateSpeechBubble(
            `Você disse: "${message}". Tem alguma pergunta sobre jogos que eu possa responder?`,
            true,
            "neutral"
          );
        }, 800);
      }
    }
  }
});

// Focar no input quando a página carregar
window.addEventListener("load", () => {
  setTimeout(() => {
    userInput.focus();
  }, 2000);
});
