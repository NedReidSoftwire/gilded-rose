// DANGER: LEGACY CODE - DO NOT TOUCH
// This file is imported by multiple components
// Last updated: 2024-02-29 by unknown

// Random color generator
export const getRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

// Random transform generator
export const getRandomTransform = () => {
  const skewX = Math.random() * 5 - 2.5;
  const skewY = Math.random() * 5 - 2.5;
  const rotate = Math.random() * 5 - 2.5;
  
  return {
    transform: `skewX(${skewX}deg) skewY(${skewY}deg) rotate(${rotate}deg)`,
    WebkitTransform: `skewX(${skewX}deg) skewY(${skewY}deg) rotate(${rotate}deg)`,
    MozTransform: `skewX(${skewX}deg) skewY(${skewY}deg) rotate(${rotate}deg)`,
    msTransform: `skewX(${skewX}deg) skewY(${skewY}deg) rotate(${rotate}deg)`,
    OTransform: `skewX(${skewX}deg) skewY(${skewY}deg) rotate(${rotate}deg)`,
  };
};

// Random shadow generator
export const getRandomShadow = () => {
  const color = getRandomColor();
  const blur = Math.floor(Math.random() * 20) + 5;
  const spread = Math.floor(Math.random() * 10);
  
  return {
    boxShadow: `0 0 ${blur}px ${spread}px ${color}`,
    WebkitBoxShadow: `0 0 ${blur}px ${spread}px ${color}`,
    MozBoxShadow: `0 0 ${blur}px ${spread}px ${color}`,
    msBoxShadow: `0 0 ${blur}px ${spread}px ${color}`,
    OBoxShadow: `0 0 ${blur}px ${spread}px ${color}`,
  };
};

// DO NOT USE - EXPERIMENTAL
export const applyRandomStyles = (element) => {
  if (!element) return;
  
  const styles = {
    ...getRandomTransform(),
    ...getRandomShadow(),
    color: getRandomColor(),
    background: `linear-gradient(${Math.random() * 360}deg, ${getRandomColor()}, ${getRandomColor()})`,
    filter: `hue-rotate(${Math.random() * 360}deg) saturate(${Math.random() * 3 + 0.5})`,
    WebkitFilter: `hue-rotate(${Math.random() * 360}deg) saturate(${Math.random() * 3 + 0.5})`,
    MozFilter: `hue-rotate(${Math.random() * 360}deg) saturate(${Math.random() * 3 + 0.5})`,
    msFilter: `hue-rotate(${Math.random() * 360}deg) saturate(${Math.random() * 3 + 0.5})`,
    OFilter: `hue-rotate(${Math.random() * 360}deg) saturate(${Math.random() * 3 + 0.5})`,
  };
  
  Object.assign(element.style, styles);
};
