import React from 'react';

export interface TimelineItemProps {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string[];
  alignLeft: boolean;
  ref?: React.RefObject<HTMLDivElement>;
}

const TimelineItem: React.FC<TimelineItemProps> = React.forwardRef<HTMLDivElement, Omit<TimelineItemProps, 'ref'>>(({
  id,
  company,
  role,
  duration,
  description,
  alignLeft,
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`relative flex ${alignLeft ? 'justify-start' : 'justify-end'}`}
    >
      <div className="w-full md:w-1/2 px-8">
        <div className="relative bg-white p-8 rounded-lg border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Number badge */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-tertiary to-quinary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
            {id}
          </div>

          {/* Timeline content */}
          <div className="ml-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {company}
              </h3>
              <span className="text-tertiary font-medium">
                {duration}
              </span>
            </div>
            <h4 className="text-xl text-quinary mb-4">{role}</h4>
            <ul className="space-y-2">
              {description.map((desc, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-tertiary mr-2 mt-1">•</span>
                  <span className="text-gray-700">{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';

export default TimelineItem;
