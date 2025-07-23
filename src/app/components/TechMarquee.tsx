import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const technologies = [
  { 
    name: 'Next.js', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg',
  },
  { 
    name: 'React', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg' 
  },
  { 
    name: 'JavaScript', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' 
  },
  { 
    name: 'TypeScript', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' 
  },
  { 
    name: 'Node.js', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg' 
  },
  { 
    name: 'Spring', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original-wordmark.svg' 
  },
  { 
    name: 'NestJS', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg' 
  },
  { 
    name: 'Django', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain-wordmark.svg' 
  },
  { 
    name: 'FastAPI', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original-wordmark.svg' 
  },
  { 
    name: 'PostgreSQL', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg' 
  },
  { 
    name: 'MySQL', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg' 
  },
  { 
    name: 'Kafka', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original-wordmark.svg' 
  },
  { 
    name: 'Docker', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg' 
  },
  { 
    name: 'Kubernetes', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain-wordmark.svg' 
  },
  { 
    name: 'AWS', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' 
  },
  { 
    name: 'Azure', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original-wordmark.svg' 
  },
  { 
    name: 'Git', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg' 
  },
  { 
    name: 'CSS3', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg' 
  },
  { 
    name: 'Sass', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' 
  },
  { 
    name: 'Python', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg' 
  },
  { 
    name: 'Java', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original-wordmark.svg' 
  },
  { 
    name: 'GraphQL', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' 
  },
];

const TechMarquee = () => {
  return (
    <div className="py-8 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
      <h3 className="text-center text-2xl font-medium text-gray-700 mb-6">Technologies I Work With</h3>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        
        <Marquee 
          pauseOnHover 
          gradient={false}
          speed={70}
          className="py-2"
        >
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center mx-6 group cursor-pointer"
              title={tech.name}
            >
              <div className="relative w-14 h-14 md:w-16 md:h-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  fill
                  className={`object-contain`}
                  sizes="(max-width: 768px) 3.5rem, 4rem"
                  unoptimized={tech.logo.startsWith('http')}
                />
              </div>
              <span className="mt-2 text-xs md:text-sm font-medium text-gray-600 group-hover:text-quinary transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default TechMarquee;
