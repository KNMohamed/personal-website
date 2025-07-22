'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenis = useLenis(); // Get the Lenis instance
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (lenis) {
      lenisRef.current = lenis;
      console.log('Lenis initialized. ScrollTrigger root element:', lenis.rootElement);

      // Set up ScrollTrigger to use Lenis for smooth scrolling
      // This is crucial for ScrollTrigger to work correctly with Lenis
      ScrollTrigger.defaults({
        scroller: lenis.rootElement, // Use Lenis's root element as the scroller
      });

      // Integrate Lenis with ScrollTrigger
      // This ensures that ScrollTrigger updates its positions when Lenis scrolls
      lenis.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(lenis.rootElement, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value as number, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        // Pinning and other advanced features require these:
        pinType:
          lenis.rootElement.style.position === 'fixed' ? 'fixed' : 'transform',
      });
      // Refresh ScrollTrigger when Lenis updates its dimensions (e.g., content changes)
      ScrollTrigger.refresh();

      // Clean up event listeners on unmount
      return () => {
        lenis.off('scroll', ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(lenis.rootElement, undefined);
        ScrollTrigger.refresh();
      };
    }
  }, [lenis]);

  return <ReactLenis root>{children}</ReactLenis>;
}
