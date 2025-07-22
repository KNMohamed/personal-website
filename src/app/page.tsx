'use client';

import { useEffect, useRef } from 'react';
import HeroSection from './components/HeroSection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const sectionRef = useRef(null);
  const boxRef = useRef(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gradientRef.current) return;
    // Ensure ScrollTrigger is registered if not already
    gsap.registerPlugin(ScrollTrigger);

    // Animate gradient background
    const gradientTl = gsap.timeline({ repeat: -1, yoyo: true });
    gradientTl.to(gradientRef.current, {
      backgroundPosition: '90% 50%',
      duration: 4,
      ease: 'none'
    });

    if (sectionRef.current && boxRef.current) {
      gsap.to(boxRef.current, {
        x: 500, // Move 500px to the right
        rotation: 360, // Rotate 360 degrees
        scale: 1.5, // Scale up to 1.5 times
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current, // When this section enters/exits the viewport
          start: 'top', // Animation starts when the top of the trigger hits the center of the viewport
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
    <div 
      ref={gradientRef} 
      className="min-h-[200vh] font-sans text-gray-800"
      style={{
        background: 'linear-gradient(45deg, #f3f4f6, #d1d5db, #9ca3af,rgb(148, 156, 175),rgb(150, 152, 155),rgb(150, 152, 155),rgb(150, 152, 155))',
        backgroundSize: '400% 400%',
        backgroundPosition: '0% 50%'
      }}
    >
      {/* Spacer to allow scrolling */}
      <HeroSection />
      <hr id="about-section" className="opacity-0" />
      {/* Section with the animated element */}
      <section
        ref={sectionRef}
        id="about"
        className="h-screen flex items-center justify-center relative overflow-hidden p-8"
      >
        <div
          ref={boxRef}
          className="w-48 h-48 bg-white flex items-center justify-center text-neutral-800 text-2xl font-bold rounded-lg shadow-xl"
        >
          Animated Box
        </div>
      </section>

      {/* Another spacer */}
      <section className="h-screen flex items-center justify-center text-4xl font-bold rounded-lg shadow-lg m-4 p-8">
        <h1>More Content Below</h1>
      </section>
    </div>
  );
}
