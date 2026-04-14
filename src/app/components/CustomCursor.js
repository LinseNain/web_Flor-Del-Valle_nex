'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const posRef = useRef({ x: -200, y: -200 });
  const targetRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Only on desktop (md+)
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setVisible(true);

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.14);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.14);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetRef.current.x}px, ${targetRef.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    const interactiveSelectors =
      'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]';
    const addListeners = (el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    };
    const removeListeners = (el) => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };

    const interactives = document.querySelectorAll(interactiveSelectors);
    interactives.forEach(addListeners);

    // MutationObserver for dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll(interactiveSelectors).forEach(addListeners);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.style.cursor = 'none';

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      interactives.forEach(removeListeners);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.style.cursor = '';
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Trailing leaf cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ zIndex: 99999, willChange: 'transform' }}
      >
        <div
          style={{
            width: hovered ? 44 : clicked ? 20 : 30,
            height: hovered ? 44 : clicked ? 20 : 30,
            marginLeft: hovered ? -22 : clicked ? -10 : -15,
            marginTop: hovered ? -22 : clicked ? -10 : -15,
            transition: 'width 0.25s ease, height 0.25s ease, margin 0.25s ease, opacity 0.2s ease',
            opacity: hovered ? 0.9 : clicked ? 1 : 0.75,
          }}
        >
          <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 2 C22 5 26 10 26 16 C26 22 21 27 15 28 C9 27 4 22 4 16 C4 10 8 5 15 2Z"
              fill="#8ad341"
              style={{
                filter: hovered ? 'drop-shadow(0 0 8px rgba(138,211,65,0.8))' : 'none',
                transition: 'filter 0.25s ease',
              }}
            />
            <line x1="15" y1="3" x2="15" y2="27" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round" />
            <line x1="15" y1="13" x2="22" y2="9" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="15" y1="18" x2="8" y2="14" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Sharp center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ zIndex: 100000, willChange: 'transform' }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            marginLeft: -2.5,
            marginTop: -2.5,
            borderRadius: '50%',
            backgroundColor: clicked ? '#ffffff' : '#5aaa1e',
            boxShadow: '0 0 6px rgba(138,211,65,0.9)',
            transition: 'background-color 0.1s ease, transform 0.1s ease',
            transform: clicked ? 'scale(0.6)' : 'scale(1)',
          }}
        />
      </div>
    </>
  );
}
