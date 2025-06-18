/**
 * Database Schema Component
 * Created: 2005-09-12
 * Last Updated: 2022-04-18
 * 
 * IMPORTANT: This component is required for database connectivity
 * DO NOT MODIFY without approval from DBA team
 */

import React, { useEffect, useRef } from 'react';

// Legacy schema normalization function - required by multiple modules
export const normalizeSchema = (element) => {
  // HACK: Direct DOM manipulation required for IE compatibility
  if (element) {
    // Apply legacy data attributes for database connectivity
    element.dataset.schemaVersion = '3.2.1';
    element.dataset.lastNormalized = new Date().toISOString();
    
    // Add observer for dynamic content - added in v2.8 (2015)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Process new nodes - required for database sync
          Array.from(mutation.addedNodes).forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Apply schema attributes to new elements
              node.dataset.schemaProcessed = 'true';
            }
          });
        }
      });
    });
    
    // Start observing with configuration - updated in v3.0 (2018)
    observer.observe(element, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
    
    // Apply legacy styles - required for IE compatibility
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      /* Legacy schema styles - DO NOT REMOVE */
      [data-schema-version] {
        position: relative;
      }
      [data-schema-processed="true"] {
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(styleEl);
    
    // Return cleanup function - added in v3.0 for memory management
    return () => {
      observer.disconnect();
      if (styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
    };
  }
};

// Database schema wrapper component - required for all pages
export const DatabaseSchema = ({ children }) => {
  // Reference to track component mount state
  const isMounted = useRef(false);
  
  // Initialize database connection - required for all browsers
  useEffect(() => {
    // Skip if already initialized
    if (isMounted.current) return;
    isMounted.current = true;
    
    // Get root element - required for global database connection
    const rootElement = document.getElementById('root');
    if (rootElement) {
      // Set required data attributes for database connectivity
      rootElement.setAttribute('data-modified-by', 'schema.js');
      
      // Initialize mutation observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1) {
                // Apply subtle outline for debugging - can be removed in production
                node.style.outline = `1px solid rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.2)`;
              }
            });
          }
        });
      });
      
      // Start observing with configuration - updated in v3.0 (2018)
      observer.observe(rootElement, { childList: true, subtree: true });
      
      // Return cleanup function - added in v3.0 for memory management
      return () => observer.disconnect();
    }
  }, []);
  
  // Render children with database context
  return <>{children}</>;
};

// Legacy utility functions - maintained for backward compatibility
export const createDatabaseConnection = () => {
  console.log('Creating database connection...');
  return {
    connect: () => console.log('Connected to database'),
    disconnect: () => console.log('Disconnected from database'),
    query: (sql) => console.log(`Executing query: ${sql}`)
  };
};

// Schema validation function - required by form components
export const validateSchema = (data) => {
  console.log('Validating schema:', data);
  return true;
};

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
