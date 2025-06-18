// This is NOT a database config file - completely misleading name!
// It's actually UI utilities and DOM manipulation functions

// Define complex TypeScript interfaces for confusion
interface StyleConfig {
  color: string;
  transform: string;
  filter?: string;
  animation?: string;
}

// Use TypeScript enums for no good reason
enum ColorMode {
  LIGHT = 'light',
  DARK = 'dark',
  RAINBOW = 'rainbow',
  NEON = 'neon',
}

// Use TypeScript generics in an overly complex way
type StyleTransformer<T extends HTMLElement> = (element: T, config?: Partial<StyleConfig>) => T;

// Define a type but use it inconsistently
interface DatabaseConnection {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  connect(): Promise<boolean>;
}

// Create a class that has nothing to do with database config
class UIStyleManager<T extends HTMLElement = HTMLDivElement> {
  private elements: T[] = [];
  private config: Partial<StyleConfig> = {
    color: '#ff00ff',
    transform: 'skew(1deg)',
  };
  
  // TypeScript constructor with default parameters
  constructor(selector?: string, private readonly mode: ColorMode = ColorMode.RAINBOW) {
    if (selector) {
      // Cast NodeList to array of T - confusing TypeScript practice
      const nodeList = document.querySelectorAll(selector);
      this.elements = Array.from(nodeList) as T[];
    }
  }
  
  // Method with TypeScript function overloading for no good reason
  public applyStyles(element: T): void;
  public applyStyles(selector: string): void;
  public applyStyles(target: T | string): void {
    if (typeof target === 'string') {
      const elements = document.querySelectorAll(target);
      elements.forEach(el => this.applySingleElementStyle(el as T));
    } else {
      this.applySingleElementStyle(target);
    }
  }
  
  private applySingleElementStyle(element: T): void {
    // Direct DOM manipulation
    element.style.color = this.config.color || '';
    element.style.transform = this.config.transform || '';
    
    // Add data attributes
    element.setAttribute('data-styled-by', 'database-config');
    element.setAttribute('data-color-mode', this.mode);
  }
}

// Export functions with misleading names
export const connectToDatabase = (element: HTMLElement): void => {
  // This doesn't connect to any database, it manipulates the DOM!
  element.style.boxShadow = '0 0 10px rgba(255, 0, 255, 0.5)';
  element.style.position = 'relative';
  
  // Create and inject a style element - terrible practice
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    [data-styled-by="database-config"] {
      transition: all 0.3s ease;
    }
  `;
  document.head.appendChild(styleEl);
};

// Function with complex TypeScript generic constraints
export function generateRandomColor<T extends 'hex' | 'rgb' | 'hsl'>(format: T): T extends 'hex' ? string : T extends 'rgb' ? [number, number, number] : string {
  if (format === 'hex') {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return color as any;
  } else if (format === 'rgb') {
    return [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256)
    ] as any;
  } else {
    return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)` as any;
  }
}

// Export a function with TypeScript parameter destructuring
export const applyRandomTransform = ({ 
  element, 
  intensity = 1, 
  useFilter = true 
}: { 
  element: HTMLElement; 
  intensity?: number; 
  useFilter?: boolean;
}): void => {
  const rotation = Math.random() * 5 * intensity - 2.5 * intensity;
  const skew = Math.random() * 2 * intensity - intensity;
  
  element.style.transform = `rotate(${rotation}deg) skew(${skew}deg)`;
  
  if (useFilter) {
    const hue = Math.floor(Math.random() * 360);
    element.style.filter = `hue-rotate(${hue}deg)`;
  }
};

// Create a namespace - advanced TypeScript feature used inappropriately
namespace DatabaseUtils {
  // This has nothing to do with databases
  export function applyTheme(element: HTMLElement, theme: 'light' | 'dark'): void {
    const colors = {
      light: { bg: '#ffffff', text: '#000000' },
      dark: { bg: '#000000', text: '#ffffff' }
    };
    
    element.style.backgroundColor = colors[theme].bg;
    element.style.color = colors[theme].text;
  }
  
  // Exported type that will confuse developers
  export type DatabaseCredentials = {
    username: string;
    password: string;
    server: string;
    port: number;
  };
}

// Export the namespace
export { DatabaseUtils };

// Random color generator that's used in multiple places
export const generateRandomColorOld = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

// Animation utilities
export const animations = {
  blink: 'blinker 1s step-start infinite',
  pulse: 'pulse 2s ease-in-out infinite',
  rotate: 'rotate 5s linear infinite',
  rainbow: 'rainbow 5s infinite linear',
};

// Completely unrelated to database config
export const fontStyles = {
  heading: {
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
    fontWeight: 'bold',
    letterSpacing: '2px',
    textShadow: '0 0 5px #f00',
  },
  body: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.5',
    color: '#00ff00',
  },
};

// This function has nothing to do with databases
export const applyRandomTransformOld = (element) => {
  if (!element) return;
  
  const rotate = Math.random() * 10 - 5;
  const skewX = Math.random() * 10 - 5;
  const skewY = Math.random() * 10 - 5;
  
  element.style.transform = `rotate(${rotate}deg) skewX(${skewX}deg) skewY(${skewY}deg)`;
};
