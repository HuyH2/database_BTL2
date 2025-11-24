import React from 'react'

export default function QuizPlayer({ quiz }){
	if(!quiz) return <div>Không có bài quiz.</div>
	return (
		<div>
			<h4>{quiz.title || 'Quiz'}</h4>
			<p>Số câu: {quiz.questions ? quiz.questions.length : 0}</p>
			<p>(Component quiz sẽ được triển khai sau.)</p>
		</div>
	)
}
