'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineItem, { TimelineItemProps } from './TimelineItem';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Timeline data
const timelineData: Omit<TimelineItemProps, 'alignLeft' | 'ref'>[] = [
  {
    id: 1,
    company: 'Your Current/Most Recent Company',
    role: 'Senior Full Stack Engineer',
    duration: '2022 - Present',
    description: [
      'Led development of scalable cloud-native applications using modern web technologies',
      'Architected and implemented microservices that improved system performance by 40%',
      'Mentored junior developers and conducted code reviews',
    ],
  },
  {
    id: 2,
    company: 'Previous Company',
    role: 'Full Stack Developer',
    duration: '2019 - 2022',
    description: [
      'Developed and maintained customer-facing web applications',
      'Collaborated with cross-functional teams to deliver features on schedule',
      'Optimized database queries reducing page load times by 30%',
    ],
  },
  {
    id: 3,
    company: 'First Company',
    role: 'Frontend Developer',
    duration: '2017 - 2019',
    description: [
      'Built responsive user interfaces using React and TypeScript',
      'Implemented state management solutions using Redux',
      'Worked closely with designers to implement pixel-perfect UIs',
    ],
  },
];

const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const createdScrollTriggers = useRef<ScrollTrigger[]>([]);

  // Clear refs on unmount
  useEffect(() => {
    // Ensure we have the sectionRef before creating ScrollTriggers
    if (!sectionRef.current) return;

    // Clear any previously created ScrollTriggers for this component on re-render
    // This is safer than killing ALL ScrollTriggers
    createdScrollTriggers.current.forEach((trigger) => trigger.kill());
    createdScrollTriggers.current = [];

    // Animate each timeline item
    timelineRefs.current.forEach((el, index) => {
      if (!el) return;

      const st = gsap.fromTo(
        el,
        { x: 300, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top ${60 + index * 15}%`, // Stagger start positions
            end: 'bottom 70%',
            toggleActions: 'play none none reverse',
            // markers: true, // Uncomment for debugging
            id: `timeline-item-${index}`, // Assign unique ID for debugging
          },
        },
      );
      createdScrollTriggers.current.push(st.scrollTrigger as ScrollTrigger);
    });

    // Cleanup function: Kill only the ScrollTriggers created by this component
    return () => {
      createdScrollTriggers.current.forEach((trigger) => trigger.kill());
      timelineRefs.current = [];
      createdScrollTriggers.current = []; // Clear the array on unmount
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen bg-white py-20 px-4 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-black">
          Work Experience
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

          <div className="space-y-32">
            {timelineData.map((item, index) => {
              const isLeftAligned = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  ref={(el: HTMLDivElement | null) => {
                    timelineRefs.current[index] = el;
                  }}
                >
                  <TimelineItem
                    {...item}
                    alignLeft={isLeftAligned}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
