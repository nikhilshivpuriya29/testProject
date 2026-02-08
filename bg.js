const canvas = document.getElementById('floatingHearts');
if (canvas) {
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
}
