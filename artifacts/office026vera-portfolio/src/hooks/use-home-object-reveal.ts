import { useLayoutEffect, useRef } from 'react';

/** Visible by default; reveal once without reserving or changing layout space. */
export function useHomeObjectReveal() {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const root = ref.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || preference.matches || typeof IntersectionObserver === 'undefined') return;
    root.dataset.homeReveal = 'waiting';
    const end = root.querySelector('.home-print-end');
    const finish = () => { root.dataset.homeReveal = 'done'; observer.disconnect(); };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === end && entry.isIntersecting) { finish(); return; }
        if (entry.target !== root) continue;
        if (entry.boundingClientRect.bottom <= 0 || (entry.isIntersecting && entry.boundingClientRect.top < -40)) { finish(); return; }
        if (entry.isIntersecting && root.dataset.homeReveal === 'waiting') root.dataset.homeReveal = 'play';
      }
    }, { threshold:0 });
    observer.observe(root);
    if (end) observer.observe(end);
    const onPreference = () => { if (preference.matches) finish(); };
    const onEnd = (event: AnimationEvent) => {
      if (event.animationName === 'home-print-feed' || event.animationName === 'home-string-tighten') finish();
    };
    root.addEventListener('focusin', finish);
    root.addEventListener('animationend', onEnd);
    if (preference.addEventListener) preference.addEventListener('change', onPreference);
    else preference.addListener(onPreference);
    return () => {
      observer.disconnect();
      root.removeEventListener('focusin', finish);
      root.removeEventListener('animationend', onEnd);
      if (preference.removeEventListener) preference.removeEventListener('change', onPreference);
      else preference.removeListener(onPreference);
      delete root.dataset.homeReveal;
    };
  }, []);
  return ref;
}
