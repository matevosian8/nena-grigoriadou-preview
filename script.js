const year = document.querySelector('[data-year]');
if (year) {
  year.textContent = String(new Date().getFullYear());
}

window.addEventListener('load', () => {
  const frames = [...document.querySelectorAll('.frames .photo')].filter((img) => img.complete && img.naturalWidth > 0);
  if (!frames.length) {
    document.querySelector('.visual')?.classList.add('no-photo');
    return;
  }

  frames[0].classList.add('is-on');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (frames.length < 2 || still) return;

  let i = 0;
  setInterval(() => {
    frames[i].classList.remove('is-on');
    i = (i + 1) % frames.length;
    frames[i].classList.add('is-on');
  }, 6500);
});

const fades = [...document.querySelectorAll('.fade')];
const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (still) {
  fades.forEach((el) => el.classList.add('in'));
} else {
  let pending = fades;
  let queued = false;

  const reveal = () => {
    queued = false;
    const limit = window.innerHeight * 0.92;
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top > limit) return true;
      el.classList.add('in');
      return false;
    });
    if (!pending.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(reveal);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  reveal();
  window.addEventListener('load', reveal);
  setTimeout(reveal, 400);
}
