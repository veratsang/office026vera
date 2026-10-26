import { useLayoutEffect } from 'react';

/** Mirror the OS preference for both CSS and viewport effects, without a UI layer. */
export function OfficeMotionPreference() {
  useLayoutEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => document.documentElement.classList.toggle('office-motion-reduced', preference.matches);
    apply();
    if (preference.addEventListener) preference.addEventListener('change', apply);
    else preference.addListener(apply);
    return () => {
      if (preference.removeEventListener) preference.removeEventListener('change', apply);
      else preference.removeListener(apply);
      document.documentElement.classList.remove('office-motion-reduced');
    };
  }, []);
  return null;
}
