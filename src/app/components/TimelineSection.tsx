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
    company: 'Datavisor',
    role: 'Software Engineer',
    duration: '2024 - 2025',
    description: [
      'Led client onboarding initiatives with cross-functional teams, defining data dictionaries, providing technical communication, and configuring fraud/risk platform features for financial institutions',
      'Oversaw the launch of platform product modules, including but not limited to system setup, software function development for multi-system integration, model deployment and updates, data analysis, and validation',
      'Developed scalable Kafka-based pipeline to support high-throughput, low-latency, real-time data ingestion to enhance platform responsiveness and analytical capabilities',
      'Engineered data transformers utilizing Java, Spring, JUnit, and Mockito with comprehensive test coverage',
      'Facilitated secure third-party API integrations for platform connectivity and multi-system integration',
      'Managed large-scale data backfills and feature hydration for complex client data migrations',
      'Deployed production services using Python, Docker, and Kubernetes on AWS infrastructure with CI/CD pipelines',
    ],
  },
  {
    id: 2,
    company: 'RWDI',
    role: 'Full Stack Software Developer',
    duration: '2022 - 2024',
    description: [
      'Co-developed on scalable Cloud-Native SaaS applications (Climate First, SpotClimate, ParticleOne) for climate and health risk assessments using Vue.js',
      'Led end-to-end feature development, stakeholder demos, mentored junior developers, and promoted best practices',
      'Built Python FastAPI REST service; improved cache performance by 30% with TanStack Query',
      'Implemented RBAC using Casbin for multi-tenant SaaS platform user permissions',
      'Introduced Storybook.JS to document Vue.js/TailwindCSS components built from Figma wireframes',
      'Managed database migrations with Alembic and SQLAlchemy ensuring data integrity across environments',
      'Provisioned Azure infrastructure (App Services, Blob Storage, Communication Services)',
    ],
  },
  {
    id: 3,
    company: 'Tata Consultancy Services',
    role: 'Software Developer',
    duration: '2018 - 2022',
    description: [
      'Led development of React Design System documentation site for Sun Life Financial\'s UI library',
      'Developed modular design system converting Figma designs to responsive React.js components with React Router, Redux, Webpack, Bootstrap',
      'Ensured compliance with Web Content Accessibility Guidelines (WCAG) using assistive technology like JAWS, Deque Axe and SiteImprove to meet the organization\'s goal of Level AA accessibility compliance',
      'Conducted functional testing with React-testing-library, Jest, and maintained code quality through SonarQube',
      'Worked on Node.js and Apollo GraphiQL to develop a performant GraphQL backend server',
      'Integrated a robust queue system using BullMQ for processing heavy background jobs',
      'Implemented DevOps best practices using Jenkins CI/CD pipeline and Bitbucket for version control',
      'Engaged in SCRUM ceremonies and utilized JIRA for project management',
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
