'use client'
import { useEffect, useRef } from 'react';

const CustomLoader = () => {
  const brandNameRef = useRef(null);
  const typingRef = useRef(null);

  useEffect(() => {
    const text = 'SKLW';
    const brandNameElement = brandNameRef.current;

    function typeText(index) {
      if (index < text.length) {
        const span = document.createElement('span');
        span.textContent = text.charAt(index);
        span.classList.add('fade-in');
        brandNameElement.appendChild(span);
        typingRef.current = setTimeout(() => {
          typeText(index + 1);
        }, 500); 
      }
    }

    typeText(0);

    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
      brandNameElement.innerHTML = '';
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-transparent" aria-busy="true" aria-live="polite">
      <div className="relative w-16 h-16 flex justify-center items-center">
        <div className="border-4 border-transparent border-t-yellow-500 border-r-yellow-700 rounded-full w-full h-full animate-spin"></div>
        <div className="absolute text-xs font-bold flex justify-center items-center w-full h-full overflow-hidden" ref={brandNameRef}></div>
      </div>
    </div>
  );
};

export default CustomLoader;