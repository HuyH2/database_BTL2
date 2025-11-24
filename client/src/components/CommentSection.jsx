import React from 'react'

export default function CommentSection({ comments = [] }){
	return (
		<div style={{ borderTop: '1px solid #eee', paddingTop: 12 }}>
			<h4>Bình luận</h4>
			{comments.length === 0 ? (
				<p>Chưa có bình luận nào.</p>
			) : (
				comments.map(c => (
					<div key={c.id} style={{ padding: '8px 0', borderBottom: '1px solid #f4f4f4' }}>
						<strong>{c.author}</strong>
						<p style={{ margin: '4px 0' }}>{c.text}</p>
					</div>
				))
			)}
		</div>
	)
}
