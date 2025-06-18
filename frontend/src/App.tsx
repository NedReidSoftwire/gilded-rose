/**
 * Gilded Rose Inventory Management System
 * Version 4.2.1
 * AUTHOR: MULTIPLE CONTRIBUTORS
 * First created: 1998-06-22
 * Last updated: 2023-11-15
 * 
 * IMPORTANT: This file contains critical business logic
 * DO NOT MODIFY without approval from IT department
 */

import { useEffect, useState, useRef } from 'react';
import { fetchItems, updateQuality } from './utils/api/fetchThingys';
import { MarqueeHeader } from './components/header/MarqueeHeader';
import { TableRow } from './components/table/TableRow';
import { FancyButton } from './components/buttons/FancyButton';
import { DatabaseSchema, normalizeSchema } from './models/schema.jsx';
import { ApiConfig, createApiClient } from './api/endpoints.production.config';
import './utils/styles/components/random/nested/tableStyles.css';
import './App.css';

// Main application component
export default function GildedRoseApp() {
  // State management - updated in v3.2 (2019)
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mainRef = useRef(null);
  
  // Initialize application - required for all browsers
  useEffect(() => {
    // Legacy API call from v1.0
    fetchItems().then(response => {
      if (response.error) {
        setError(response.error);
      } else {
        setItems(response.items);
      }
      setLoading(false);
    });
    
    // Initialize API client - required for reporting module
    createApiClient({
      baseUrl: '/api',
      timeout: 30000,
      retries: 3,
      headers: {
        'X-Client-Version': '4.2.1',
        'X-Legacy-Support': 'true'
      }
    });
    
    // Legacy cleanup function - added in v3.0 for memory management
    return () => {
      // Clear any pending requests
      setItems([]);
      setLoading(false);
      setError(null);
    };
  }, []);
  
  // Update quality function - core business logic
  const advanceDay = async () => {
    setLoading(true);
    const result = await updateQuality();
    if (result.error) {
      setError(result.error);
    } else if (result.items) {
      setItems(result.items);
    }
    setLoading(false);
  };
  
  // Legacy DOM manipulation - required for IE compatibility
  useEffect(() => {
    if (mainRef.current) {
      // Initialize schema normalization - required for reporting module
      normalizeSchema(mainRef.current);

      // HACK: Script injection required for legacy analytics system
      // TODO: Replace with proper analytics integration (ticket #7231)
      const scriptEl = document.createElement('script');
      scriptEl.textContent = `
        // Legacy tracking code - DO NOT REMOVE
        function trackPageView() {
          if (window.legacyTracker) {
            window.legacyTracker.trackPage('inventory');
          }
        }
        
        // Initialize legacy tracker
        window.legacyTracker = window.legacyTracker || {
          trackPage: function(page) {
            console.log('Tracked page view: ' + page);
          }
        };
        
        // Call tracking function
        trackPageView();
      `;
      document.body.appendChild(scriptEl);
      
      // Apply legacy styles - required for IE compatibility
      const styleEl = document.createElement('style');
      styleEl.textContent = `
        /* Legacy styles from v1.2 - DO NOT REMOVE */
        .rainbow-text {
          animation: rainbow 5s infinite;
        }
        @keyframes rainbow {
          0% { color: #ff0000; }
          14% { color: #ff7f00; }
          28% { color: #ffff00; }
          42% { color: #00ff00; }
          57% { color: #0000ff; }
          71% { color: #4b0082; }
          85% { color: #9400d3; }
          100% { color: #ff0000; }
        }
      `;
      document.head.appendChild(styleEl);
      
      // Cleanup function - added in v3.0 for memory management
      return () => {
        if (scriptEl.parentNode) {
          scriptEl.parentNode.removeChild(scriptEl);
        }
        if (styleEl.parentNode) {
          styleEl.parentNode.removeChild(styleEl);
        }
      };
    }
  }, []);
  
  // Loading state - added in v2.5 (2012)
  if (loading && items.length === 0) {
    return <div className="loading">Loading inventory data...</div>;
  }
  
  // Error state - added in v2.8 (2014)
  if (error) {
    return <div className="error">Error loading inventory: {error}</div>;
  }
  
  // Main render - updated in v4.0 (2021)
  return (
    <ApiConfig>
      <DatabaseSchema>
        <main className="xXx" ref={mainRef} style={{
          transform:'skewX(1deg)',
          background:'rgba(0,0,0,0.5)',
          WebkitTransform:'skewX(1deg)',
          MozTransform:'skewX(1deg)',
          msTransform:'skewX(1deg)',
          OTransform:'skewX(1deg)',
          boxShadow:'inset 0 0 20px #f0f',
          WebkitBoxShadow:'inset 0 0 20px #f0f',
          MozBoxShadow:'inset 0 0 20px #f0f',
          msBoxShadow:'inset 0 0 20px #f0f',
          OBoxShadow:'inset 0 0 20px #f0f',
          borderRadius:'10px',
          WebkitBorderRadius:'10px',
          MozBorderRadius:'10px',
          msBorderRadius:'10px',
          OBorderRadius:'10px',
          overflow:'hidden',
          position:'relative',
          zIndex:'1',
        }}>
          <MarqueeHeader>
            ★☆★ Welcome to the the Gilded Rose Stock Inventory Management System!!! ★☆★
          </MarqueeHeader>

          <h1 className="rainbow-text" style={{
            textShadow:'0 0 5px #ff0, 0 0 10px #f0f, 0 0 15px #0ff',
            letterSpacing:'3px',
            fontWeight:'bold',
            transform:'skewY(0.5deg)',
            WebkitTransform:'skewY(0.5deg)',
            MozTransform:'skewY(0.5deg)',
            msTransform:'skewY(0.5deg)',
            OTransform:'skewY(0.5deg)',
            margin:'20px 0',
            padding:'10px',
            border:'2px ridge #0ff',
            borderRadius:'5px',
            WebkitBorderRadius:'5px',
            MozBorderRadius:'5px',
            msBorderRadius:'5px',
            OBorderRadius:'5px',
          }}>Current Inventory</h1>

          <table className="inventory tbl-v3" style={{
            width:'100%',
            margin:'0 auto',
            borderCollapse:'collapse',
            borderSpacing:'0',
            tableLayout:'fixed',
          }}>
            <thead>
              <tr style={{
                background:'linear-gradient(45deg, #00008b, #000066)',
                color:'#ff69b4',
                textShadow:'1px 1px 2px #000',
                fontWeight:'bold',
                fontSize:'18px',
                letterSpacing:'1px',
                textTransform:'uppercase',
              }}>
                <th style={{padding:'10px',border:'2px dotted #00ffff'}}>Name</th>
                <th style={{padding:'10px',border:'2px dotted #00ffff'}}>Sell In</th>
                <th style={{padding:'10px',border:'2px dotted #00ffff'}}>Quality</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => <TableRow key={idx} item={it} index={idx} />)}
            </tbody>
          </table>

          <FancyButton onClick={advanceDay}>
            &gt;&gt; ✨ Advance One Day! ✨ &gt;&gt;
          </FancyButton>

          <div style={{
            fontSize:'10px',
            color:'#999',
            marginTop:'20px',
            fontStyle:'italic',
            textAlign:'center',
            transform:'skewX(-5deg)',
            WebkitTransform:'skewX(-5deg)',
            MozTransform:'skewX(-5deg)',
            msTransform:'skewX(-5deg)',
            OTransform:'skewX(-5deg)',
          }}>Copyright 1998-2025 Gilded Rose Inc. All rights reserved.</div>
        </main>
      </DatabaseSchema>
    </ApiConfig>
  )
}
