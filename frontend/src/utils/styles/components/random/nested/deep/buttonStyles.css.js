// This file has a deliberately misleading extension (.css.js)
// It's actually JavaScript but named to confuse developers

export const btn_styles_v2 = {
  border: '3px dashed magenta',
  boxShadow: '0 0 10px cyan',
  transform: 'rotate(-1deg)',
  WebkitTransform: 'rotate(-1deg)',
  MozTransform: 'rotate(-1deg)',
  msTransform: 'rotate(-1deg)',
  OTransform: 'rotate(-1deg)',
  filter: 'saturate(1.5)',
  WebkitFilter: 'saturate(1.5)',
  background: 'linear-gradient(45deg, #ff00ff22, #00ffff22)',
};

// Deliberately confusing - this is not CSS but looks like it
export const STYLES = `
  .button {
    border: 3px dashed magenta;
    box-shadow: 0 0 10px cyan;
    transform: rotate(-1deg);
  }
`;

// This function will be used to inject styles directly into DOM
export const injectStyles = () => {
  const styleEl = document.createElement('style');
  styleEl.textContent = STYLES;
  document.head.appendChild(styleEl);
};
