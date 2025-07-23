'use client';

import { useEffect, useRef, useState, CSSProperties } from 'react';
import styles from './bubble-background.module.css'; // Import the CSS Module

// Define the type for a single bubble object in our state
interface Bubble {
  id: number;
  style: CSSProperties; // React's type for inline styles
}

const BubbleBackground = () => {
  const bubbleColors = ['#c5a5ab', '#e3e2dd', '#87a6c0'];
  const numBubbles = 30; // Based on your HTML, you have 30 bubbles
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to check if an element is offscreen
  const isOffscreen = (element: HTMLElement | null) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.left + rect.width < 0 ||
      rect.top + rect.height < 0 ||
      rect.left > window.innerWidth ||
      rect.top > window.innerHeight
    );
  };

  useEffect(() => {
    const container = document.getElementById('background-animation-container');
    if (!container) return;
    const initialBubbles: Bubble[] = Array.from({ length: numBubbles }).map(
      (_, index) => {
        const backgroundColor: string =
          bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
        const opacity: number = Math.random() * 0.75;
        const bubbleSize: number = (Math.floor(Math.random() * 9) + 2) * 50;
        const left: number = Math.floor(Math.random() * 100);
        const animationDuration: number = Math.floor(Math.random() * 16) + 8;
        const animationDelay: number = Math.floor(Math.random() * 8);

        return {
          id: index, // Unique ID for React's `key` prop
          style: {
            backgroundColor,
            opacity,
            width: `${bubbleSize}px`,
            height: `${bubbleSize}px`,
            borderRadius: `${bubbleSize / 2}px`,
            left: `${left}%`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`,
          },
        };
      },
    );

    setBubbles(initialBubbles);

    // 2. Set up the Interval for Repositioning Offscreen Bubbles
    const interval = setInterval(() => {
      // Ensure the containerRef has a current value (meaning the component is mounted)
      if (containerRef.current) {
        // Get an array of actual DOM bubble elements
        const currentBubbleElements: HTMLCollection =
          containerRef.current.children;

        // Iterate through each bubble element to check if it's offscreen
        Array.from(currentBubbleElements).forEach((bubbleElement) => {
          // Cast the HTMLElement to ensure it has `dataset` and `getBoundingClientRect`
          const htmlBubbleElement = bubbleElement as HTMLElement;

          if (isOffscreen(htmlBubbleElement)) {
            // Find the corresponding bubble in our state using its data-id
            const bubbleId = parseInt(htmlBubbleElement.dataset.id || '-1'); // Get the ID from data-id attribute

            setBubbles((prevBubbles) =>
              prevBubbles.map(
                (bubble) =>
                  bubble.id === bubbleId // Check if this is the bubble we need to update
                    ? {
                        ...bubble,
                        style: {
                          ...bubble.style,
                          left: `${Math.floor(Math.random() * 140 - 19)}%`,
                        },
                      } // Update its left position
                    : bubble, // Otherwise, return the bubble unchanged
              ),
            );
          }
        });
      }
    }, 50); // Check every 50 milliseconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.backgroundAnimationContainer} ref={containerRef}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id} // Essential for React list rendering performance
          data-id={bubble.id} // Store the ID on the DOM element for easy lookup
          className={styles.aniBubble}
          style={bubble.style} // Apply the dynamically generated styles
        ></div>
      ))}
    </div>
  );
};

export default BubbleBackground;
