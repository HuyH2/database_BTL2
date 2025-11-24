import React from 'react'

export default function CertificateTemplate({ studentName = 'Học viên', courseTitle = 'Khóa học' }){
	return (
		<div style={{ border: '2px solid #444', padding: 24, width: '800px', margin: '0 auto', textAlign: 'center', fontFamily: 'Roboto, Arial' }}>
			<h2>Chứng nhận hoàn thành</h2>
			<p style={{ marginTop: 20 }}>Chứng nhận rằng</p>
			<h1 style={{ margin: '10px 0' }}>{studentName}</h1>
			<p>đã hoàn thành khóa học</p>
			<h3 style={{ margin: '10px 0' }}>{courseTitle}</h3>
			<div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<p>Ngày hoàn thành</p>
					<p>{new Date().toLocaleDateString()}</p>
				</div>
				<div>
					<p>Người cấp</p>
					<p>E-Learning</p>
				</div>
			</div>
		</div>
	)
}
