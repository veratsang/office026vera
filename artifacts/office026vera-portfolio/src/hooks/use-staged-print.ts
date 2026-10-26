import { useLayoutEffect, useRef, useState } from 'react';

/** Fully visible until measurement succeeds; only user actions animate height. */
export function useStagedPrint() {
  const paperRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const shown = useRef(3);
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [count, setCount] = useState(3);
  const [height, setHeight] = useState<number>();
  const [busy, setBusy] = useState(false);
  const measure = () => {
    const paper = paperRef.current;
    if (!paper) return undefined;
    const rows = paper.querySelectorAll('li');
    if (rows.length !== 3) return undefined;
    return shown.current === 3 ? paper.getBoundingClientRect().height :
      rows[shown.current - 1].getBoundingClientRect().bottom - paper.getBoundingClientRect().top + parseFloat(getComputedStyle(paper).paddingBottom);
  };
  const unlock = () => { clearTimeout(timer.current); locked.current = false; setBusy(false); };
  const printAll = () => { unlock(); shown.current = 3; setCount(3); setHeight(measure()); };
  useLayoutEffect(() => {
    const paper = paperRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!paper || preference.matches || typeof ResizeObserver === 'undefined') return;
    shown.current = 1;
    const initial = measure();
    if (!initial || !Number.isFinite(initial)) { shown.current = 3; return; }
    setCount(1); setHeight(initial);
    const observer = new ResizeObserver(() => setHeight(measure()));
    observer.observe(paper);
    const onPreference = () => { if (preference.matches) printAll(); };
    if(preference.addEventListener) preference.addEventListener('change', onPreference);
    else preference.addListener(onPreference);
    return () => { observer.disconnect(); if(preference.removeEventListener) preference.removeEventListener('change', onPreference); else preference.removeListener(onPreference); clearTimeout(timer.current); };
  }, []);
  const printNext = () => {
    if (locked.current || shown.current >= 3) return;
    locked.current = true; setBusy(true);
    shown.current += 1; setCount(shown.current); setHeight(measure());
    timer.current = setTimeout(unlock, 950);
  };
  return {paperRef, windowRef, count, height, busy, printNext, printAll, unlock};
}
