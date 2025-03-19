const player = document.querySelector('.player');
    const video = player.querySelector('.viewer');
    const toggle = player.querySelector('.toggle');
    const volume = player.querySelector("[name='volume']");
    const speed = player.querySelector("[name='playbackSpeed']");
    const skips = player.querySelectorAll('.skip');
    const progress = player.querySelector('.progress');
    const progressBar = player.querySelector('.progress__filled');

    function togglePlay() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }

    function updateButton() {
      toggle.textContent = video.paused ? '►' : '❚ ❚';
    }

    function handleRangeUpdate() {
      video[this.name] = this.value;
    }

    function skip() {
      video.currentTime += parseFloat(this.dataset.skip);
    }

    function handleProgress() {
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${percent}%`;
    }

    function scrub(e) {
      const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
      video.currentTime = scrubTime;
    }

    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', handleProgress);

    toggle.addEventListener('click', togglePlay);
    volume.addEventListener('change', handleRangeUpdate);
    speed.addEventListener('change', handleRangeUpdate);
    skips.forEach(button => button.addEventListener('click', skip));
    
    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);