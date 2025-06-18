import React from 'react';

// This component is used in multiple places
// DO NOT MODIFY WITHOUT UPDATING ALL REFERENCES
export const TableRow = ({ item, index }) => {
  const evenOdd = index % 2 ? '#000' : '#00f';
  
  // Apply different styles based on quality
  const getQualityColor = (quality) => {
    if (quality > 20) return '#ff0';
    if (quality > 10) return '#0f0';
    return '#f00';
  };

  return (
    <tr 
      style={{
        background: evenOdd,
        filter: 'hue-rotate(45deg)',
        WebkitFilter: 'hue-rotate(45deg)',
        MozFilter: 'hue-rotate(45deg)',
        msFilter: 'hue-rotate(45deg)',
        OFilter: 'hue-rotate(45deg)',
        transition: 'all 0.3s ease',
        WebkitTransition: 'all 0.3s ease',
        MozTransition: 'all 0.3s ease',
        msTransition: 'all 0.3s ease',
        OTransition: 'all 0.3s ease',
        boxShadow: '0 0 5px rgba(0,255,255,0.3)',
        position: 'relative',
        zIndex: index,
      }}
    >
      <td style={{
        padding: '8px', 
        textAlign: 'left',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px #000',
        color: '#fff',
        borderBottom: '1px dotted #0ff',
      }}>{item.name}</td>
      <td style={{
        padding: '8px', 
        textAlign: 'center',
        color: item.sell_in < 5 ? '#f00' : '#0f0',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px #000',
        borderBottom: '1px dotted #0ff',
      }}>{item.sell_in}</td>
      <td style={{
        padding: '8px', 
        textAlign: 'center',
        color: getQualityColor(item.quality),
        fontWeight: 'bold',
        textShadow: '1px 1px 2px #000',
        borderBottom: '1px dotted #0ff',
      }}>{item.quality}</td>
    </tr>
  );
};
