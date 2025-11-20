import React from 'react'

export default function SearchBar({ value, onChange, onSearch }){
  return (
    <div>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder="Search..." />
      <button onClick={onSearch}>Search</button>
    </div>
  )
}
