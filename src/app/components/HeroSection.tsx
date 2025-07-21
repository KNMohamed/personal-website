import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!headerRef.current || !sectionRef.current) return;

    // Set initial styles for the header
    gsap.set(headerRef.current, {
      position: 'fixed',
      top: '2rem',
      left: '2rem',
      zIndex: 50,
      opacity: 1,
    });

    // Create the scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onLeave: () => {
          gsap.to(headerRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          });
        },
        onEnterBack: () => {
          gsap.to(headerRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut',
          });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-gradient-to-br from-neutral-200 to-neutral-600 text-white p-8"
    >
      {/* Fixed Header */}
      <div ref={headerRef} className="text-2xl font-medium text-neutral-100">
        Full Stack Software Engineer
      </div>

      <div className="flex flex-col items-center justify-end h-full pb-24">
        <h1 className="absolute text-8xl top-1/4 md:top-1/3 -translate-y-1/2 w-full max-w-[90%] md:max-w-4xl">
          <span className="block text-8xl">
            Khalid
          </span> Walker-Mohamed
        </h1>
        <div className="text-center max-w-4xl">
          <p className="text-lg md:text-xl mb-8 text-neutral-100">
            I build exceptional digital experiences with modern web
            technologies.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#contact"
              className="px-6 py-3 bg-white text-neutral-600 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Get In Touch
            </a>
            <a
              href="#work"
              className="px-6 py-3 border-2 border-white text-neutral-600 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
            >
              View My Work
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 animate-bounce">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
