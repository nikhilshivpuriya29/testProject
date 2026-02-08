const ask = document.getElementById('askValentine');
const hidden = document.getElementById('hiddenYes');
const celebrate = document.getElementById('celebrate');

function show(section) {
  ask.classList.remove('active');
  hidden.classList.remove('active');
  celebrate.classList.remove('active');
  section.classList.add('active');
}

function playMusic() {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;
  audio.volume = 0.8;
  const p = audio.play();
  if (p && p.catch) p.catch(() => {});
}

window.yesClicked = function () {
  show(celebrate);
  playMusic();
};

window.noClicked = function () {
  show(hidden);
  setTimeout(() => {
    show(celebrate);
    playMusic();
  }, 1800);
};
