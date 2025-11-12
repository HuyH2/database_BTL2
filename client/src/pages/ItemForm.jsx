import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createItem } from '../api/items'

export default function ItemForm(){
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const nav = useNavigate()

  async function onSubmit(e){
    e.preventDefault()
    await createItem({ name, description })
    nav('/items')
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Create Item</h2>
      <label>Name <input value={name} onChange={e=>setName(e.target.value)} required /></label>
      <label>Description <textarea value={description} onChange={e=>setDescription(e.target.value)} /></label>
      <button type="submit">Save</button>
    </form>
  )
}
