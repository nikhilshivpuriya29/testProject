// ----- SIMPLE SCREEN NAVIGATION -----
const screens = document.querySelectorAll('.screen');
let currentIndex = 0; // 0 = first .screen (intro)

function showScreen(index) {
  screens.forEach((screen, i) => {
    if (i === index) {
      screen.classList.add('active');
    } else {
      screen.classList.remove('active');
    }
  });
}

// Make functions global for inline onclick
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
  }, 1800);
};

window.yesClicked = function () {
  const ask = document.getElementById('askValentine');
  const celebrate = document.getElementById('celebrate');

  ask.classList.remove('active');
  celebrate.classList.add('active');

  currentIndex = Array.from(screens).indexOf(celebrate);
  playMusic();
};

// ----- MUSIC -----
function playMusic() {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;
  audio.volume = 0.8;
  const p = audio.play();
  if (p && p.catch) p.catch(() => {});
}

// ----- FLOATING HEARTS BACKGROUND -----
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

for (let i = 0; i < 24; i++) {
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
