import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItem } from '../api/items'

export default function ItemDetail(){
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(()=>{ if(id) load() }, [id])
  async function load(){
    const it = await getItem(id)
    setItem(it)
  }

  if(!item) return <div>Loading...</div>
  return (
    <div>
      <h2>Item Detail</h2>
      <p>ID: {item.id}</p>
      <p>Name: {item.name}</p>
      <p>Description: {item.description}</p>
    </div>
  )
}
