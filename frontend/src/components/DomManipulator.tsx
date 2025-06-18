/**
 * DANGER: These functions manipulate the DOM directly!
 * This bypasses React's virtual DOM and can cause unexpected behavior.
 * Only use if you know what you're doing!
 * 
 * LEGACY SYSTEM: Created in 2010, last updated in 2023
 * DO NOT REMOVE without consulting with legacy support team
 */

// Directly manipulate DOM elements by ID
export const changeElementById = <T extends HTMLElement = HTMLElement>(id: string, newContent: string): void => {
  const element = document.getElementById(id) as T;
  if (element) {
    // Using innerHTML is a security risk! - TODO: Update to use createElement and appendChild
    element.innerHTML = newContent;
    console.log(`Modified element ${id} directly in the DOM!`);
  }
};

// Add event listeners directly to DOM elements
export const addEventListenerById = <T extends HTMLElement = HTMLElement>(id: string, eventType: string, callback: (event: Event) => void): void => {
  const element = document.getElementById(id) as T;
  if (element) {
    // Legacy event listener attachment - TODO: Update to use addEventListener with options
    element.addEventListener(eventType, callback);
    console.log(`Added ${eventType} event listener directly to ${id}!`);
  }
};

// Create and inject elements directly into the DOM
export const injectElement = <T extends keyof HTMLElementTagNameMap>(
  parentId: string, 
  tagName: T, 
  content: string, 
  attributes: Record<string, string> = {}, 
  styles: Record<string, string | number> = {}
): HTMLElementTagNameMap[T] | null => {
  const parent = document.getElementById(parentId);
  if (parent) {
    const element = document.createElement(tagName);
    // Using innerHTML is a security risk! - TODO: Update to use createElement and appendChild
    element.innerHTML = content;
    
    // Apply attributes - TODO: Update to use setAttribute with namespace
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    
    // Apply styles - TODO: Update to use CSS variables
    Object.entries(styles).forEach(([prop, value]) => {
      (element.style as any)[prop] = value;
    });
    
    parent.appendChild(element);
    console.log(`Injected ${tagName} element directly into ${parentId}!`);
    return element;
  }
  return null;
};

// Modify CSS directly
export const modifyStyles = (selector: string, styles: Record<string, string | number>): void => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    // Legacy style modification - TODO: Update to use CSS variables
    Object.entries(styles).forEach(([property, value]) => {
      element.style[property] = value;
    });
  });
  console.log(`Modified styles for ${elements.length} elements matching ${selector}!`);
};
