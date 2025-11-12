import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ItemsList from './pages/ItemsList'
import ItemForm from './pages/ItemForm'
import ItemDetail from './pages/ItemDetail'

export default function App(){
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link> | <Link to="/items">Items</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<h2>Welcome</h2>} />
          <Route path="/items" element={<ItemsList/>} />
          <Route path="/items/create" element={<ItemForm/>} />
          <Route path="/items/:id" element={<ItemDetail/>} />
        </Routes>
      </main>
    </div>
  )
}
