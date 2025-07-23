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
  const colors = [
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#10B981', // Emerald
    '#F59E0B', // Amber
  ];

  const generateBubble = useCallback((): BubbleProps => {
    const bubble = {
      id: Math.random().toString(36).substring(2, 11),
      x: Math.random() * 90 + 5, // 5-95% to avoid edges
      y: 110, // Start from bottom
      size: Math.random() * 80 + 60, // 20-50px
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.15 + 0.05, // 0.3-0.8
      duration: Math.random() * 5 + 8, // 8-13 seconds
      delay: 0,
    };
    console.log('Generated bubble:', bubble);
    return bubble;
  }, [colors]);

  useEffect(() => {
    console.log('Setting up bubble generation interval');
    const interval = setInterval(() => {
      setBubbles((prev) => {
        console.log('Current bubbles count:', prev.length);
        if (prev.length >= maxBubbles) {
          return prev;
        }
        const newBubble = generateBubble();
        console.log('Adding new bubble:', newBubble);
        return [...prev, newBubble];
      });
    }, generationRate);

    return () => {
      console.log('Cleaning up interval');
      clearInterval(interval);
    };
  }, [generateBubble, maxBubbles, generationRate]);

  // Clean up bubbles after animation
  useEffect(() => {
    if (bubbles.length === 0) return;

    const timeouts = bubbles.map((bubble) => {
      return setTimeout(() => {
        console.log('Removing bubble:', bubble.id);
        setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
      }, bubble.duration * 1000);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [bubbles]);

  console.log('Rendering bubbles:', bubbles.length);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} bubble={bubble} />
      ))}
      {/* Debug info */}
      <div className="absolute top-4 left-4 text-white text-sm bg-black/50 p-2 rounded pointer-events-auto">
        Bubbles: {bubbles.length}
      </div>
    </div>
  );
};

export default BubbleContainer;
