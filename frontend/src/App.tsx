import { useEffect, useState } from 'react'
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
    <main className="geocities">
      <marquee scrollAmount={10} behavior="scroll">
          {"★☆★ Welcome to the Totally Rad Gilded Rose Stock-o-Matic 3000!!! ★☆★"}
      </marquee>
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
        &gt;&gt; Advance One Totally Tubular Day! &gt;&gt;
      </button>
    </main>
  )
}

export default App
