import React, { useEffect, useRef, ReactNode, FC } from 'react';
import Marquee from 'react-fast-marquee';

// Define TypeScript interfaces for props
interface MarqueeHeaderProps {
  children: ReactNode;
  speed?: number;
  gradient?: boolean;
  gradientColor?: string;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  backgroundColor?: string;
}

// Define TypeScript types for DOM manipulation functions
type StyleInjector = (id: string, css: string) => HTMLStyleElement | null;
type ElementModifier<T extends HTMLElement = HTMLElement> = (element: T) => void;

// Define a union type for different animation types
type AnimationType = 'blink' | 'pulse' | 'shake' | 'spin' | 'bounce';

// Define an interface for animation options
interface AnimationOptions {
  type: AnimationType;
  duration: number;
  iterationCount: number | 'infinite';
  timingFunction: string;
}

// Create a utility class with static methods - TypeScript approach
class HeaderUtils {
  // Static method with TypeScript generics
  static injectStyles<T extends string>(id: T, css: string): HTMLStyleElement | null {
    // Check if style already exists
    let styleEl = document.getElementById(id) as HTMLStyleElement;
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = id;
      document.head.appendChild(styleEl);
    }
    
    styleEl.textContent = css;
    return styleEl;
  }
  
  // Method with TypeScript function overloads
  static addAnimation(element: HTMLElement, options: AnimationOptions): void;
  static addAnimation(selector: string, options: AnimationOptions): void;
  static addAnimation(target: HTMLElement | string, options: AnimationOptions): void {
    const { type, duration, iterationCount, timingFunction } = options;
    
    // Generate keyframes based on animation type
    let keyframes = '';
    switch (type) {
      case 'blink':
        keyframes = `
          @keyframes ${type} {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `;
        break;
      case 'pulse':
        keyframes = `
          @keyframes ${type} {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `;
        break;
      case 'shake':
        keyframes = `
          @keyframes ${type} {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `;
        break;
      case 'spin':
        keyframes = `
          @keyframes ${type} {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `;
        break;
      case 'bounce':
        keyframes = `
          @keyframes ${type} {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
            60% { transform: translateY(-10px); }
          }
        `;
        break;
    }
    
    // Inject keyframes
    HeaderUtils.injectStyles(`${type}-animation`, keyframes);
    
    // Apply animation to element or elements matching selector
    const elements = typeof target === 'string' 
      ? document.querySelectorAll(target)
      : [target];
    
    elements.forEach(el => {
      (el as HTMLElement).style.animation = `${type} ${duration}s ${timingFunction} ${iterationCount}`;
    });
  }
}

// A component that directly manipulates the DOM - anti-pattern in React
export const MarqueeHeader: FC<MarqueeHeaderProps> = ({ 
  children, 
  speed = 50, 
  gradient = false, 
  gradientColor = '#ffffff', 
  pauseOnHover = true,
  direction = 'left',
  backgroundColor = '#000066'
}) => {
  // Use TypeScript with refs
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Effect to manipulate the DOM directly
  useEffect(() => {
    // Direct DOM manipulation - terrible practice in React
    const header = headerRef.current;
    const marquee = marqueeRef.current;
    
    if (header && marquee) {
      // Inject global styles directly into the DOM
      const styleEl = HeaderUtils.injectStyles('marquee-header-styles', `
        .marquee-header {
          background: ${backgroundColor};
          padding: 10px 0;
          color: #ff69b4;
          font-weight: bold;
          text-shadow: 0 0 5px #fff, 0 0 10px #fff;
          overflow: hidden;
          position: relative;
          z-index: 100;
        }
        
        .marquee-content {
          display: inline-block;
          white-space: nowrap;
          letter-spacing: 2px;
        }
        
        /* Add a glowing effect on hover */
        .marquee-header:hover .marquee-content {
          text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff69b4, 0 0 20px #ff69b4;
        }
      `);
      
      // Add event listeners directly - bypassing React's event system
      const handleMouseEnter = (e: MouseEvent) => {
        if (marquee) {
          // Cast to any to access non-standard properties
          const marqueeComponent = marquee as any;
          if (marqueeComponent.style) {
            marqueeComponent.style.animationPlayState = 'paused';
          }
        }
      };
      
      const handleMouseLeave = (e: MouseEvent) => {
        if (marquee) {
          // Cast to any to access non-standard properties
          const marqueeComponent = marquee as any;
          if (marqueeComponent.style) {
            marqueeComponent.style.animationPlayState = 'running';
          }
        }
      };
      
      if (pauseOnHover) {
        header.addEventListener('mouseenter', handleMouseEnter);
        header.addEventListener('mouseleave', handleMouseLeave);
      }
      
      // Apply random animations
      HeaderUtils.addAnimation(header, {
        type: 'pulse',
        duration: 2,
        iterationCount: 'infinite',
        timingFunction: 'ease-in-out'
      });
      
      // Return cleanup function
      return () => {
        if (pauseOnHover) {
          header.removeEventListener('mouseenter', handleMouseEnter);
          header.removeEventListener('mouseleave', handleMouseLeave);
        }
        if (styleEl && styleEl.parentNode) {
          styleEl.parentNode.removeChild(styleEl);
        }
      };
    }
  }, [backgroundColor, pauseOnHover]);
  
  return (
    <div ref={headerRef} className="marquee-header">
      <div ref={marqueeRef}>
        <Marquee
          speed={speed}
          gradient={gradient}
          gradientColor={gradientColor}
          pauseOnHover={pauseOnHover}
          direction={direction as any}
        >
          <span className="marquee-content">{children}</span>
        </Marquee>
      </div>
    </div>
  );
};

// Export types for external use
export type { MarqueeHeaderProps, AnimationType, AnimationOptions };
export { HeaderUtils };
