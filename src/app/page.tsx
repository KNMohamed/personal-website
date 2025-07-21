'use client';

import { useEffect, useRef } from 'react';
import HeroSection from './components/HeroSection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const sectionRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    // Ensure ScrollTrigger is registered if not already
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && boxRef.current) {
      gsap.to(boxRef.current, {
        x: 500, // Move 500px to the right
        rotation: 360, // Rotate 360 degrees
        scale: 1.5, // Scale up to 1.5 times
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current, // When this section enters/exits the viewport
          start: 'top center', // Animation starts when the top of the trigger hits the center of the viewport
          end: 'bottom center', // Animation ends when the bottom of the trigger hits the center of the viewport
          scrub: true, // Smoothly link animation progress to scroll position
          markers: false, // Set to true for debugging scroll positions
          // pin: true, // Optionally pin the section while animation plays
        },
      });
    }

    // Clean up ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-[200vh] bg-gray-100 font-sans text-gray-800">
      {/* Spacer to allow scrolling */}
      <HeroSection />

      {/* Section with the animated element */}
      <section
        ref={sectionRef}
        className="h-screen bg-green-200 flex items-center justify-center relative overflow-hidden rounded-lg shadow-lg m-4 p-8"
      >
        <div
          ref={boxRef}
          className="w-48 h-48 bg-purple-500 flex items-center justify-center text-white text-2xl font-bold rounded-lg shadow-xl"
        >
          Animated Box
        </div>
      </section>

      {/* Another spacer */}
      <section className="h-screen flex items-center justify-center bg-yellow-200 text-4xl font-bold rounded-lg shadow-lg m-4 p-8">
        <h1>More Content Below</h1>
      </section>
    </div>
  );
}
