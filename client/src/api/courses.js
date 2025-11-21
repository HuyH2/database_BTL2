const BASE = '/api/items'

export async function getItems(q=''){
  const url = BASE + (q ? `?q=${encodeURIComponent(q)}` : '')
  const res = await fetch(url)
  return res.json()
}

export async function getItem(id){
  const res = await fetch(`${BASE}/${id}`)
  return res.json()
}

export async function createItem(data){
  const res = await fetch(BASE, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) })
  return res.json()
}
