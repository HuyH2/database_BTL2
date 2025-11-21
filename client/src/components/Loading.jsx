import React from 'react'

export default function Loading({ message = 'Đang tải...' }){
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 20, height: 20, border: '3px solid #ddd', borderTopColor: '#3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <span>{message}</span>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
