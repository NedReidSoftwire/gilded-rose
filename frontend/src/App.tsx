import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import './App.css'

interface Item {
  name: string
  sell_in: number
  quality: number
}

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadItems = () => {
    setLoading(true)
    fetch('/api/items')
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items)
        setLoading(false)
      })
      .catch((e) => {
        setError(String(e))
        setLoading(false)
      })
  }

  useEffect(() => {
    loadItems()
  }, [])

  const advanceDay = () => {
    fetch('/api/update-quality', { method: 'POST' })
      .then((r) => r.json())
      .then((data) => setItems(data.items))
  }

  if (loading) return <div className="spinner">Loading…</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <main className="cool-looking-box">
      <Marquee gradient={false} speed={40}>
        ★☆★ Welcome to the the Gilded Rose Stock Inventory Management System!!! ★☆★
      </Marquee>
      <h1 className="rainbow-text">Current Inventory</h1>
      <table className="inventory">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sell In</th>
            <th>Quality</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={idx}>
              <td>{it.name}</td>
              <td>{it.sell_in}</td>
              <td>{it.quality}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="blink" onClick={advanceDay}>
        &gt;&gt; ✨ Advance One Day! ✨ &gt;&gt;
      </button>
    </main>
  )
}

export default App
