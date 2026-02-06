// Get all screens in correct order
const screens = document.querySelectorAll('.screen');
let currentIndex = 0; // start from first screen (intro)

// Helper to show a given screen index
function showScreen(index) {
  screens.forEach((screen, i) => {
    if (i === index) {
      screen.classList.add('active');
    } else {
      screen.classList.remove('active');
    }
  });
}

// Expose functions globally so HTML onclick="" can see them
window.nextScreen = function () {
  if (currentIndex < screens.length - 1) {
    currentIndex++;
    showScreen(currentIndex);
  }
};

window.noClicked = function () {
  const ask = document.getElementById('askValentine');
  const hidden = document.getElementById('hiddenYes');
  const celebrate = document.getElementById('celebrate');

  ask.classList.remove('active');
  hidden.classList.add('active');

  currentIndex = Array.from(screens).indexOf(hidden);

  setTimeout(() => {
    hidden.classList.remove('active');
    celebrate.classList.add('active');
    currentIndex = Array.from(screens).indexOf(celebrate);
    playMusic();
    triggerFinalHearts();
  }, 1800);
};

window.yesClicked = function () {
  const ask = document.getElementById('askValentine');
  const celebrate = document.getElementById('celebrate');

  ask.classList.remove('active');
  celebrate.classList.add('active');

  currentIndex = Array.from(screens).indexOf(celebrate);
  playMusic();
  triggerFinalHearts();
};

// Music
function playMusic() {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;
  audio.volume = 0.8;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
}

/* Floating hearts animation on canvas */
const canvas = document.getElementById('floatingHearts');
const ctx = canvas.getContext('2d');
let hearts = [];
let cw, ch;

function resizeCanvas() {
  cw = canvas.width = window.innerWidth;
  ch = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createHeart() {
  return {
    x: Math.random() * cw,
    y: ch + Math.random() * 100,
    size: 10 + Math.random() * 16,
    speed: 0.5 + Math.random() * 1.2,
    alpha: 0.4 + Math.random() * 0.4
  };
}

for (let i = 0; i < 26; i++) {
  hearts.push(createHeart());
}

function drawHeart(x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 20, size / 20);
  ctx.beginPath();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#ff5c8d';

  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-10, -15, -25, -5, -10, 10);
  ctx.bezierCurveTo(0, 20, 10, 10, 10, 10);
  ctx.bezierCurveTo(25, -5, 10, -15, 0, 0);

  ctx.fill();
  ctx.restore();
}

function animateHearts() {
  ctx.clearRect(0, 0, cw, ch);
  hearts.forEach(h => {
    h.y -= h.speed;
    if (h.y < -40) {
      h.x = Math.random() * cw;
      h.y = ch + Math.random() * 60;
      h.size = 10 + Math.random() * 16;
      h.speed = 0.5 + Math.random() * 1.2;
      h.alpha = 0.4 + Math.random() * 0.4;
    }
    drawHeart(h.x, h.y, h.size, h.alpha);
  });
  requestAnimationFrame(animateHearts);
}
animateHearts();

/* Small pop animation for final hearts on YES */
function triggerFinalHearts() {
  const finalHearts = document.querySelector('.finalHearts');
  if (!finalHearts) return;
  finalHearts.classList.remove('pop');
  void finalHearts.offsetWidth; // restart animation
  finalHearts.classList.add('pop');
}

// Inject keyframes for pop
const style = document.createElement('style');
style.textContent = `
  .finalHearts.pop span {
    animation: popHeart 0.6s ease-out forwards;
  }
  .finalHearts.pop span:nth-child(2) {
    animation-delay: 0.12s;
  }
  .finalHearts.pop span:nth-child(3) {
    animation-delay: 0.24s;
  }
  @keyframes popHeart {
    0% { transform: translateY(10px) scale(0.4); opacity: 0; }
    60% { transform: translateY(-6px) scale(1.1); opacity: 1; }
    100% { transform: translateY(0) scale(1); opacity: 1; }
  }
`;
document.head.appendChild(style);
