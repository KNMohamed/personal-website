import React from 'react';
import { BubbleProps } from '@/app/types/bubble';

interface BubbleComponentProps {
  bubble: BubbleProps;
}

const Bubble: React.FC<BubbleComponentProps> = ({ bubble }) => {
  console.log('Rendering bubble:', bubble.id, bubble);

  return (
    <div
      className="absolute rounded-full bubble-float backdrop-blur-lg"
      style={{
        left: `${bubble.x}%`,
        bottom: `-${bubble.size}px`, // Start below the screen
        width: `${bubble.size}px`,
        height: `${bubble.size}px`,
        backgroundColor: bubble.color,
        opacity: bubble.opacity,
        animationDuration: `${bubble.duration}s`,
        transform: 'translateY(0)',
        zIndex: 10,
        filter: 'blur(2px)',
        boxShadow: `0 0 ${bubble.size * 0.3}px ${bubble.color}40`,
      }}
    />
  );
};

export default Bubble;
