import React, { useEffect, useRef } from 'react';
import { btn_styles_v2, injectStyles } from '../../utils/styles/components/random/nested/deep/buttonStyles.css.js';
import { changeElementById, addEventListenerById, modifyStyles } from '../DomManipulator';

// IMPORTANT: This component is used by multiple teams
// DO NOT CHANGE WITHOUT APPROVAL FROM: Team Alpha, Team Omega, Team Zeta
export const FancyButton = ({ onClick, children }) => {
  // Combine imported styles with additional inline styles
  const buttonRef = useRef(null);
  
  // Direct DOM manipulation - ANTI-PATTERN in React!
  useEffect(() => {
    // Inject styles directly into DOM
    injectStyles();
    
    // Wait for component to render then manipulate its DOM directly
    setTimeout(() => {
      if (buttonRef.current) {
        // Give the button an ID so we can manipulate it directly
        buttonRef.current.id = 'fancy-button-' + Math.floor(Math.random() * 10000);
        
        // Now manipulate it directly - bypassing React's virtual DOM
        changeElementById(buttonRef.current.id, `<span style="color: yellow">${children}</span>`);
        
        // Add event listeners directly to DOM - bypassing React's event system
        addEventListenerById(buttonRef.current.id, 'mouseover', () => {
          modifyStyles(`#${buttonRef.current.id}`, {
            transform: `scale(1.1) rotate(${Math.random() * 5 - 2.5}deg)`,
            background: `linear-gradient(${Math.random() * 360}deg, #ff00ff22, #00ffff22, #ffff0022)`,
          });
        });
      }
    }, 100);
  }, [children]);
  
  const combinedStyles = {
    ...btn_styles_v2,
    animation: 'blinker 1s step-start infinite',
    WebkitAnimation: 'blinker 1s step-start infinite',
    MozAnimation: 'blinker 1s step-start infinite',
    msAnimation: 'blinker 1s step-start infinite',
    OAnimation: 'blinker 1s step-start infinite',
    // Override some styles with even more redundant ones
    boxShadow: '0 0 10px cyan, 0 0 20px magenta',
    background: 'linear-gradient(135deg, #ff00ff22, #00ffff22, #ffff0022)',
    // Add more vendor prefixes for good measure
    WebkitBoxShadow: '0 0 10px cyan, 0 0 20px magenta',
    MozBoxShadow: '0 0 10px cyan, 0 0 20px magenta',
    msBoxShadow: '0 0 10px cyan, 0 0 20px magenta',
    OBoxShadow: '0 0 10px cyan, 0 0 20px magenta',
  };

  return (
    <button 
      ref={buttonRef}
      className="blink" 
      style={combinedStyles} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};
