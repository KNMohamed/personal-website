'use client';

import { useEffect, useRef } from 'react';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gradientRef.current) return;

    // Animate gradient background
    const gradientTl = gsap.timeline({ repeat: -1, yoyo: true });
    gradientTl.to(gradientRef.current, {
      backgroundPosition: '90% 50%',
      duration: 4,
      ease: 'none',
    });

    // Cleanup function
    return () => {
      gradientTl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* Gradient background */}
      <div
        ref={gradientRef}
        className="fixed inset-0 -z-10"
        style={{
          background:
            'linear-gradient(45deg, #f3f4f6, #d1d5db, #9ca3af, #949caf, #96989b)',
          backgroundSize: '400% 400%',
          backgroundPosition: '0% 50%',
        }}
      />

      <main>
        <HeroSection />
        <TimelineSection />

        {/* About Section */}
        {/* <section
          ref={sectionRef}
          id="about"
          className="min-h-screen flex items-center justify-center relative p-8 bg-white"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">About Me</h2>
          </div>
        </section> */}
      </main>
      {/* <section className="h-screen flex items-center justify-center text-4xl font-bold rounded-lg shadow-lg m-4 p-8">
        <h1>More Content Below</h1>
      </section> */}
    </div>
  );
}
