import { useLayoutEffect, useRef } from 'react';

/** Progressive enhancement: no observer or reduced motion means visible content. */
export function useOfficeReveal() {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const root = ref.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || preference.matches || typeof IntersectionObserver === 'undefined') return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>(
      ':scope > .lab-formula-group, :scope > .lab-formula-operator, :scope > .lab-formula-folder',
    ));
    let observer: IntersectionObserver;
    const show = (step: HTMLElement, immediate = false) => {
      if (step.dataset.officeReveal !== 'pending') return;
      step.classList.remove('office-step-pending');
      step.dataset.officeReveal = 'visible';
      if (!immediate) step.classList.add('office-step-visible');
      observer.unobserve(step);
    };
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) show(entry.target as HTMLElement);
      }
      // Catch steps passed by a fast scroll without a persistent scroll listener.
      for (const step of steps) {
        if (step.dataset.officeReveal === 'pending' && step.getBoundingClientRect().bottom <= 0) show(step, true);
      }
    }, { threshold: 0 });
    steps.forEach((step, index) => {
      step.style.setProperty('--office-step-delay', `${Math.min(index * 30, 120)}ms`);
      step.dataset.officeReveal = 'pending';
      step.classList.add('office-step-pending');
      observer.observe(step);
    });
    const revealAll = () => steps.forEach(step => show(step, true));
    const onPreference = () => { if (preference.matches) revealAll(); };
    const onFocus = (event: FocusEvent) => {
      const step = (event.target as Element).closest<HTMLElement>('[data-office-reveal]');
      if (step) show(step, true);
    };
    if (preference.addEventListener) preference.addEventListener('change', onPreference);
    else preference.addListener(onPreference);
    root.addEventListener('focusin', onFocus);
    return () => {
      observer.disconnect();
      root.removeEventListener('focusin', onFocus);
      if (preference.removeEventListener) preference.removeEventListener('change', onPreference);
      else preference.removeListener(onPreference);
      for (const step of steps) {
        step.classList.remove('office-step-pending', 'office-step-visible');
        step.style.removeProperty('--office-step-delay');
        delete step.dataset.officeReveal;
      }
    };
  }, []);
  return ref;
}
