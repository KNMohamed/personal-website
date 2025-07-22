'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typed from 'typed.js';
import { Button } from "@/components/ui/button";

// Register ScrollTrigger plugin

const HeroSection = () => {
  const headerContainerRef = useRef<HTMLDivElement>(null); // New ref for the fixed container
  const headerTextRef = useRef<HTMLDivElement>(null); // Ref for the actual text element
  const sectionRef = useRef<HTMLElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [isTypingComplete, setIsTypingComplete] = React.useState(false);

  useEffect(() => {
    if (!headerContainerRef.current || !headerTextRef.current || !sectionRef.current) return;
    // Set initial styles for the header container
    // This container will be fixed
    gsap.set(headerContainerRef.current, {
      position: 'fixed',
      top: '2rem',
      left: '2rem',
      zIndex: 50,
      width: 'auto', // Allow content to dictate width
      height: 'auto', // Allow content to dictate height
    });

    // Create the scroll animation for the header text only
    // The trigger is the HeroSection itself, but we animate the text
    gsap.to(headerTextRef.current, { // Animate the text element, not the fixed container
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current, // Trigger when the HeroSection scrolls
        start: 'top top', // When the top of the HeroSection hits the top of the viewport
        end: 'bottom top', // When the bottom of the HeroSection leaves the top of the viewport
        scrub: true,
        id: 'header-scroll',
        // markers: true,
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
      ScrollTrigger.getById('header-scroll')?.kill();
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
      {/* Fixed container for the header text */}
      <div ref={headerContainerRef}>
        <div ref={headerTextRef} className="text-2xl font-medium text-black">
          Senior Full Stack Software Engineer
        </div>
      </div>

      <div 
        className="absolute inset-0 z-0"
      />
      
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
              <div className="relative inline-block">
                <span className="text-6xl md:text-8xl">
                  <span 
                    ref={typedRef} 
                    className="inline-block"
                    style={{
                      background: 'linear-gradient(to right, #525252, rgba(0, 0, 0, 1.0))',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      position: 'relative',
                      zIndex: 1
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
                      WebkitTextFillColor: 'transparent',
                      position: 'relative',
                      zIndex: 1
                    }}
                  >|</span>
                </span>
                <span 
                  className="absolute left-0 h-2 md:h-3 bg-gradient-to-r from-tertiary to-quinary"
                  style={{
                    bottom: '-0.5rem',
                    width: isTypingComplete ? '100%' : '0%',
                    transition: 'width 0.3s ease-in-out',
                    borderRadius: '2px',
                    zIndex: 2
                  }}
                />
              </div>
            </div>
          </div>
        </h1>
        <div className="text-center max-w-4xl">
          <p className="text-lg md:text-3xl mb-8 text-black">
            Over 7 years of experience building scalable, cloud-native digital experiences with modern web technologies.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
                <a
                href="#contact"
                className="px-8 py-4 bg-quaternary text-white font-medium rounded-lg hover:bg-quinary transition-colors"
                >
                Get In Touch
                </a>
            </Button>
            <Button asChild size="lg">
                <a
                href="#work"
                className="px-8 py-4 border-2 border-quaternary text-white font-medium rounded-lg hover:bg-quaternary transition-colors"
                >
                View My Work
                </a>
            </Button>
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