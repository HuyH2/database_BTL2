import React from 'react'

export default function DocumentViewer({ src, title = 'Tài liệu' }){
	if(!src) return <div>Không có tài liệu để hiển thị.</div>
	return (
		<div>
			<h4>{title}</h4>
			<iframe src={src} title={title} style={{ width: '100%', height: 600, border: 'none' }} />
		</div>
	)
}
