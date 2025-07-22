import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typed from 'typed.js';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [isTypingComplete, setIsTypingComplete] = React.useState(false);

  useEffect(() => {
    if (!headerRef.current || !sectionRef.current || !gradientRef.current) return;

    // Set initial styles for the header
    gsap.set(headerRef.current, {
      position: 'fixed',
      top: '2rem',
      left: '2rem',
      zIndex: 50,
      opacity: 1,
    });

    // Animate gradient background
    const gradientTl = gsap.timeline({ repeat: -1, yoyo: true });
    gradientTl.to(gradientRef.current, {
      backgroundPosition: '100% 50%',
      duration: 4,
      ease: 'none'
    });

    // Create the scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom center',
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

    // Initialize Typed.js
    let typed: Typed | null = null;
    if (typedRef.current) {
      typedRef.current.innerHTML = ''; // Clear any existing content
      typed = new Typed(typedRef.current, {
        strings: ['Khalid Walker-Mohamed.'],
        typeSpeed: 60,
        showCursor: false,
        startDelay: 300,
        onComplete: () => {
          setIsTypingComplete(true);
          if (cursorRef.current) {
            cursorRef.current.style.display = 'none';
          }
        },
        onStringTyped: () => {
          if (cursorRef.current) {
            cursorRef.current.style.animation = 'none';
            void cursorRef.current.offsetWidth; // Trigger reflow
            cursorRef.current.style.animation = 'blink 0.7s infinite';
          }
        }
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (typed) {
        typed.destroy();
      }
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative h-screen text-white p-8 overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div 
        ref={gradientRef}
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(45deg, #f3f4f6, #d1d5db, #9ca3af,rgb(138, 144, 158),rgb(110, 120, 135),rgb(100, 110, 125),rgb(78, 87, 100))',
          backgroundSize: '400% 400%',
          backgroundPosition: '0% 50%'
        }}
      />
      {/* Fixed Header */}
      <div ref={headerRef} className="text-2xl font-medium text-black">
        Full Stack Software Engineer
      </div>

      <div className="flex flex-col items-center justify-end h-full pb-24 relative z-10">
        <h1 
            className="absolute text-8xl top-1/4 md:top-2/5 md:-translate-y-1/2 w-full max-w-[90%]" 
            style= {{
                background: 'linear-gradient(to right, #525252,rgba(0, 0, 0, 1.0))',
                backgroundClip: 'text', /* Clip the background to the text shape */
                color: 'transparent' /* Fallback for browsers that don't support -webkit-text-fill-color */
            }}
        >
          <div className="flex flex-col w-full">
            <span className="text-4xl md:text-5xl mb-2">Hello my name is,</span>
            <div className="relative w-full">
              <span className="text-6xl md:text-8xl">
                <span 
                  ref={typedRef} 
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(to right, #525252, rgba(0, 0, 0, 1.0))',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                />
                <span 
                  ref={cursorRef}
                  className="typed-cursor text-6xl md:text-8xl"
                  style={{
                    display: isTypingComplete ? 'none' : 'inline-block',
                    opacity: isTypingComplete ? 0 : 1,
                    background: 'linear-gradient(to right, #525252, rgba(0, 0, 0, 1.0))',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >|</span>
              </span>
            </div>
          </div>
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
              className="px-6 py-3 border-2 border-white text-neutral-200 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
            >
              View My Work
            </a>
          </div>
        </div>
        <button 
          onClick={() => {
            const nextSection = document.getElementById('about');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="absolute bottom-8 animate-bounce cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Scroll to next section"
        >
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
        </button>
      </div>
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/10 z-0" />
    </section>
  );
};

export default HeroSection;
