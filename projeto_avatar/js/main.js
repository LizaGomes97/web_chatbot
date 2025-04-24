// Importações do Three.js
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Elementos do DOM
const speechBubble = document.getElementById("speech-bubble");
const userInput = document.getElementById("user-input");
const userForm = document.getElementById("user-form");
const avatarContainer = document.getElementById("avatar-container");

// Estado do chat
let userName = "";
let conversationStarted = false;

// Variáveis Three.js
let scene, camera, renderer, model;
let mixer, clock, actions, activeAction, previousAction;
let face;

// Expressões disponíveis
const expressions = ["Angry", "Surprised", "Sad", "Happy"];

// Estados de animação disponíveis
const states = [
  "Idle",
  "Walking",
  "Running",
  "Dance",
  "Death",
  "Sitting",
  "Standing",
];
const emotes = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];

// Inicialização
init();

// Função para inicializar o avatar 3D
function init() {
  // Configurar clock para animações
  clock = new THREE.Clock();

  // Criar cena
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);

  // Configurar câmera
  camera = new THREE.PerspectiveCamera(
    70,
    avatarContainer.clientWidth / avatarContainer.clientHeight,
    0.75,
    100
  );
  camera.position.set(0, 2, 4);
  camera.lookAt(0, 0, 0);

  // Configurar luzes
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(0, 10, 10);
  scene.add(dirLight);

  // Configurar renderizador
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(avatarContainer.clientWidth, avatarContainer.clientHeight);
  renderer.setClearColor(0x000000, 0); // Fundo transparente
  avatarContainer.appendChild(renderer.domElement);

  // Carregar modelo do robô
  const loader = new GLTFLoader();
  // Use um CDN para carregar o modelo (caso o modelo esteja disponível online)
  loader.load(
    "https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb",
    function (gltf) {
      model = gltf.scene;

      // Centralizar e escalar o modelo
      model.position.set(0, -1.5, 0);
      model.scale.set(0.9, 0.9, 0.9);

      // Adicionar à cena
      scene.add(model);

      // Configurar animações
      setupAnimations(model, gltf.animations);

      // Ajustar a posição da câmera
      camera.lookAt(0, 1, 0);

      // Focar no campo de resposta após o carregamento
      setTimeout(() => {
        userInput.focus();
      }, 1000);
    }
  );

  // Evento de redimensionamento
  window.addEventListener("resize", onWindowResize);

  // Iniciar loop de animação
  animate();
}

// Configurar animações do modelo
function setupAnimations(model, animations) {
  mixer = new THREE.AnimationMixer(model);
  actions = {};

  for (let i = 0; i < animations.length; i++) {
    const clip = animations[i];
    const action = mixer.clipAction(clip);
    actions[clip.name] = action;

    if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
    }
  }

  // Encontrar face para expressões
  face = model.getObjectByName("Head_4");

  // Iniciar com Idle
  fadeToAction("Idle", 0.5);
}

// Mudar animação com transição suave
function fadeToAction(name, duration) {
  previousAction = activeAction;
  activeAction = actions[name];

  if (previousAction !== activeAction) {
    if (previousAction) previousAction.fadeOut(duration);
  }

  activeAction
    .reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(duration)
    .play();
}

// Função para definir expressão facial
function setExpression(name, value = 1) {
  if (face && face.morphTargetDictionary) {
    const index = face.morphTargetDictionary[name];
    if (index !== undefined) {
      // Resetar todas as expressões
      for (let i = 0; i < face.morphTargetInfluences.length; i++) {
        face.morphTargetInfluences[i] = 0;
      }
      // Definir nova expressão
      face.morphTargetInfluences[index] = value;
    }
  }
}

// Redimensionar ao alterar tamanho da janela
function onWindowResize() {
  camera.aspect = avatarContainer.clientWidth / avatarContainer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(avatarContainer.clientWidth, avatarContainer.clientHeight);
}

// Loop de animação
function animate() {
  requestAnimationFrame(animate);

  if (mixer) {
    mixer.update(clock.getDelta());
  }

  renderer.render(scene, camera);
}

// Focar no campo de resposta após carregar
setTimeout(() => {
  userInput.focus();
}, 2000);

// Exportar funções para uso em outros módulos
export { fadeToAction, setExpression, expressions, states, emotes };
