// This is NOT an API endpoints config file - completely misleading!
// It's actually a React component with inline styles and DOM manipulation

import React from 'react';

// Global variable to track if we've already injected styles
let _stylesInjected = false;

// This component has nothing to do with API endpoints
export const ApiConfig = ({ children }) => {
  React.useEffect(() => {
    if (!_stylesInjected) {
      // Inject global styles directly into the DOM
      const styleEl = document.createElement('style');
      styleEl.id = 'api-config-styles';
      styleEl.textContent = `
        /* These styles have nothing to do with API config */
        body {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="fill:none;stroke:%23f0f;stroke-width:2px;"><circle cx="10" cy="10" r="8"/></svg>') 10 10, auto !important;
        }
        
        /* Random animation that has nothing to do with API */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        /* Apply floating animation to random elements */
        h1, button, table {
          animation: float 3s ease-in-out infinite;
        }
      `;
      document.head.appendChild(styleEl);
      _stylesInjected = true;
      
      // Create a global object with misleading name
      window.__API_CONFIG = {
        // These aren't API endpoints at all!
        endpoints: {
          getItems: () => {
            // This actually manipulates the DOM!
            const tables = document.querySelectorAll('table');
            tables.forEach(table => {
              table.style.borderSpacing = Math.random() * 5 + 'px';
            });
            return { success: true };
          },
          updateQuality: () => {
            // More DOM manipulation
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
              button.style.transform = `rotate(${Math.random() * 5 - 2.5}deg)`;
            });
            return { success: true };
          }
        }
      };
      
      // Set up an interval to call these fake "API endpoints"
      const interval = setInterval(() => {
        window.__API_CONFIG.endpoints.getItems();
        window.__API_CONFIG.endpoints.updateQuality();
      }, 15000);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  return (
    <div style={{ 
      position: 'relative',
      /* More inline styles that have nothing to do with API config */
      perspective: '1000px',
      transformStyle: 'preserve-3d'
    }}>
      {children}
    </div>
  );
};

// This isn't a real API client
export const createApiClient = (element) => {
  if (!element) return;
  
  // Instead, it manipulates the DOM!
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            // Add random styles to new elements
            node.style.transition = 'all 0.5s ease';
          }
        });
      }
    });
  });
  
  // Start observing
  observer.observe(element, { 
    childList: true,
    subtree: true
  });
  
  return observer; // This isn't an API client at all!
};
