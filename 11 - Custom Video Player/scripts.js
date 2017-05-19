/*  Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const toggleButton = player.querySelector('.toggle');
const fullscreenButton = player.querySelector('[data-fullscreen]');
let mouseDown = false;

/*  Functions */
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton(e) {
  toggleButton.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e) {
  video[e.target.name] = e.target.value;
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  console.log('scrubbing');
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;

  video.currentTime = scrubTime;
}

function enterFullscreen() {
  video.webkitEnterFullscreen();
}

/*  Events */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

toggleButton.addEventListener('click', togglePlay);
fullscreenButton.addEventListener('click', enterFullscreen);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', (e) => mouseDown && handleRangeUpdate(e));
  range.addEventListener('mousedown', () => mouseDown = true);
  range.addEventListener('mouseup', () => mouseDown = false);
  range.addEventListener('mouseout', () => mouseDown = false);
});
