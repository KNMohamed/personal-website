import { BubbleProps } from '@/app/types/bubble';
import React, { useState, useEffect, useCallback } from 'react';
import Bubble from './Bubble';

interface BubbleContainerProps {
  maxBubbles?: number;
  generationRate?: number;
  className?: string;
}

/**
 * Usage Example:
 * <BubbleContainer
 *   maxBubbles={30}
 *   generationRate={300}
 *   className="absolute inset-0"
 * />
 */
const BubbleContainer: React.FC<BubbleContainerProps> = ({
  maxBubbles = 20,
  generationRate = 1000,
  className = '',
}) => {
  const [bubbles, setBubbles] = useState<BubbleProps[]>([]);

  const generateBubble = useCallback((): BubbleProps => {
    const colors = ['#507472', '#d1d5db', '#89838d'];
    const bubble = {
      id: Math.random().toString(36).substring(2, 11),
      x: Math.random() * 98 + 1,
      y: 110, // Start from bottom
      size: Math.random() * 120 + 60,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 4 + 5,
      delay: 2,
    };
    return bubble;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length >= maxBubbles) {
          return prev;
        }
        const newBubble = generateBubble();
        return [...prev, newBubble];
      });
    }, generationRate);

    return () => {
      clearInterval(interval);
    };
  }, [generateBubble, maxBubbles, generationRate]);

  // Clean up bubbles after animation
  useEffect(() => {
    if (bubbles.length === 0) return;

    const timeouts = bubbles.map((bubble) => {
      return setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
      }, bubble.duration * 1000);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [bubbles]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} bubble={bubble} />
      ))}
    </div>
  );
};

export default BubbleContainer;
