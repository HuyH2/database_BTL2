import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getItems } from '../api/items'

export default function ItemsList(){
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')

  useEffect(()=>{ fetchItems() }, [])

  async function fetchItems(){
    const res = await getItems(q)
    setItems(res)
  }

  return (
    <div>
      <h2>Items</h2>
      <div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="search..." />
        <button onClick={fetchItems}>Search</button>
        <Link to="/items/create">Create</Link>
      </div>
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map(it=> (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>{it.name}</td>
              <td>
                <Link to={`/items/${it.id}`}>Detail</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
