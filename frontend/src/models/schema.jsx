// This is NOT a schema file at all - completely misleading name!
// It contains React components and DOM manipulation functions

import React, { useEffect } from 'react';

// Global DOM manipulation function that runs on page load
(function() {
  // This self-executing function runs as soon as the file is imported
  console.log('Executing global DOM manipulation from "schema.js"');
  
  // Create a global variable on window - terrible practice!
  window.__GILDED_ROSE_GLOBAL_STATE = {
    domModified: false,
    lastUpdated: new Date(),
    counter: 0
  };
  
  // Add a global event listener to the document
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, applying global modifications');
    
    // Create and inject a global style element
    const globalStyle = document.createElement('style');
    globalStyle.textContent = `
      * {
        transition: all 0.3s ease !important;
      }
      
      body::after {
        content: "Modified by schema.js";
        position: fixed;
        bottom: 5px;
        right: 5px;
        font-size: 10px;
        color: rgba(255,255,255,0.3);
        z-index: 9999;
      }
    `;
    document.head.appendChild(globalStyle);
    
    // Set up an interval to periodically modify the DOM
    setInterval(() => {
      window.__GILDED_ROSE_GLOBAL_STATE.counter++;
      window.__GILDED_ROSE_GLOBAL_STATE.lastUpdated = new Date();
      
      // Find random elements and modify them
      const allElements = document.querySelectorAll('div, span, button');
      if (allElements.length > 0) {
        const randomElement = allElements[Math.floor(Math.random() * allElements.length)];
        randomElement.style.transform = `rotate(${Math.random() * 2 - 1}deg)`;
        window.__GILDED_ROSE_GLOBAL_STATE.domModified = true;
      }
    }, 30000); // Every 30 seconds
  });
})();

// A React component with a misleading name
export const DatabaseSchema = ({ children }) => {
  // This is not a database schema at all, it's a UI component!
  
  useEffect(() => {
    // Direct DOM manipulation
    const rootElement = document.getElementById('root');
    if (rootElement) {
      // Add a custom attribute
      rootElement.setAttribute('data-modified-by', 'schema.js');
      
      // Modify the DOM tree directly
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1) { // Element node
                // Add a random inline style to any new element
                node.style.outline = `1px solid rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.2)`;
              }
            });
          }
        });
      });
      
      // Start observing DOM changes
      observer.observe(rootElement, { childList: true, subtree: true });
      
      return () => observer.disconnect();
    }
  }, []);
  
  return <>{children}</>;
};

// Export a function with a misleading name
export const normalizeSchema = (element) => {
  // This doesn't normalize any schema, it manipulates the DOM!
  if (!element) return;
  
  // Find all child elements and modify them directly
  const children = element.querySelectorAll('*');
  children.forEach((child, index) => {
    // Add random styles based on element index
    child.style.zIndex = 1000 - index;
    if (index % 3 === 0) {
      child.style.filter = 'hue-rotate(45deg)';
    } else if (index % 3 === 1) {
      child.style.filter = 'brightness(1.1)';
    } else {
      child.style.filter = 'contrast(1.1)';
    }
  });
};
