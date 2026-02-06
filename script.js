let current = 1;

function nextScreen() {
  document.querySelectorAll('.screen')[current-1].classList.remove('active');
  document.querySelectorAll('.screen')[current].classList.add('active');
  current++;
}

function noClicked() {
  document.getElementById('askValentine').classList.remove('active');
  document.getElementById('hiddenYes').classList.add('active');
  setTimeout(() => {
    document.getElementById('hiddenYes').classList.remove('active');
    document.getElementById('celebrate').classList.add('active');
  }, 2000);
}

function yesClicked() {
  document.getElementById('askValentine').classList.remove('active');
  document.getElementById('celebrate').classList.add('active');
  document.getElementById('bgMusic').play();
}
