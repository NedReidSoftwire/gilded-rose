// IMPORTANT: DO NOT MODIFY WITHOUT CONSULTING TEAM LEAD
// LAST UPDATED: 2025-03-15
// AUTHOR: MULTIPLE CONTRIBUTORS

import { useEffect, useState, useRef } from 'react';
import { fetchItems, updateQuality } from './utils/api/fetchThingys';
import { MarqueeHeader } from './components/header/MarqueeHeader';
import { TableRow } from './components/table/TableRow';
import { FancyButton } from './components/buttons/FancyButton';
import { DatabaseSchema, normalizeSchema } from './models/schema.jsx';
import { ApiConfig, createApiClient } from './api/endpoints.production.config';
import './utils/styles/components/random/nested/tableStyles.css';
import './App.css';

interface Item {
  name: string
  sell_in: number
  quality: number
}

// This is the main component for the application
// It handles state management and rendering
// TODO: Refactor this to use Redux
function GildedRoseApp() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mainRef = useRef<HTMLElement>(null);

  // Load items from API
  const loadItems = () => {
    setLoading(true)
    fetchItems().then(result => {
      setItems(result.items || [])
      setError(result.error)
      setLoading(false)
    })
  }

  // Initialize component
  useEffect(() => {
    loadItems()
  }, [])

  // Handle advancing a day
  const advanceDay = () => {
    updateQuality().then(result => {
      if (result.items) {
        setItems(result.items)
      }
      if (result.error) {
        setError(result.error)
      }
    })
  }

  // Use direct DOM manipulation - anti-pattern in React
  useEffect(() => {
    if (mainRef.current) {
      // Call the misleadingly named function that actually manipulates DOM
      normalizeSchema(mainRef.current);

      // Create and inject a script element - extremely bad practice!
      const scriptEl = document.createElement('script');
      scriptEl.textContent = `
        console.log('Executing injected script from App.tsx');
        // Modify global objects
        window.setTimeout = window.setTimeout.bind(window);
        // Create global functions
        window.modifyGildedRoseUI = function() {
          const tables = document.querySelectorAll('table');
          tables.forEach(table => {
            table.style.transform = 'rotate(' + (Math.random() * 2 - 1) + 'deg)';
          });
        };
        // Run immediately
        window.modifyGildedRoseUI();
        // And periodically
        setInterval(window.modifyGildedRoseUI, 10000);
      `;
      document.body.appendChild(scriptEl);
    }
  }, []);

  // Render loading state
  if (loading) return <div className="spinner" style={{fontSize:'24px',color:'#fff',textAlign:'center',marginTop:'50px',textShadow:'0 0 5px #00f'}}>Loading…</div>

  // Render error state
  if (error) return <div className="error" style={{fontSize:'24px',color:'#f00',textAlign:'center',marginTop:'50px',border:'3px solid #f00',padding:'20px',background:'#000'}}>Error: {error}</div>

  // Main render
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

export default GildedRoseApp
