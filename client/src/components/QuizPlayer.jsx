import React, { useState } from 'react';

const QuizPlayer = ({ quizData }) => {
  // Giả lập câu hỏi (Thường sẽ lấy từ bảng QUESTIONS - nếu có, hoặc JSON trong CONTENT_ITEM)
  const questions = [
    { id: 1, text: "SQL là viết tắt của gì?", options: ["Structured Query Language", "Simple Question List", "Strong Query Logic"], correct: 0 },
    { id: 2, text: "Lệnh nào dùng để lấy dữ liệu?", options: ["UPDATE", "SELECT", "DELETE"], correct: 1 },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNext = () => {
    if (selectedOption === questions[currentQ].correct) {
      setScore(score + 1);
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  // Tính toán kết quả theo bảng QUIZ
  const finalScore = (score / questions.length) * 100;
  const isPassed = finalScore >= quizData.PassingScore;

  if (showResult) {
    return (
      <div style={styles.resultBox}>
        <h3>Kết quả bài kiểm tra</h3>
        <div style={{fontSize: '40px', margin: '20px 0'}}>
          {isPassed ? '🎉' : '😢'}
        </div>
        <p>Điểm số: <strong>{finalScore.toFixed(0)}/100</strong></p>
        <p>Điểm đạt yêu cầu: {quizData.PassingScore}</p>
        
        <div style={{...styles.badge, backgroundColor: isPassed ? '#27ae60' : '#e74c3c'}}>
          {isPassed ? 'ĐẠT (PASSED)' : 'KHÔNG ĐẠT (FAILED)'}
        </div>
        
        <button style={styles.btn} onClick={() => window.location.reload()}>Làm lại</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>📝 {quizData.Title}</h2>
        <p>{quizData.Description}</p>
        <span style={{fontSize: '12px', color: '#666'}}>Câu {currentQ + 1} / {questions.length}</span>
      </div>

      <div style={styles.questionBox}>
        <h4>{questions[currentQ].text}</h4>
        <div style={styles.options}>
          {questions[currentQ].options.map((opt, index) => (
            <label key={index} style={styles.optionLabel}>
              <input 
                type="radio" 
                name="quiz" 
                checked={selectedOption === index} 
                onChange={() => setSelectedOption(index)}
              />
              <span style={{marginLeft: 10}}>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={handleNext} style={styles.btn} disabled={selectedOption === null}>
        {currentQ === questions.length - 1 ? 'Nộp bài' : 'Câu tiếp theo'}
      </button>
    </div>
  );
};

const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: 'white' },
  header: { borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' },
  questionBox: { marginBottom: '30px' },
  options: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' },
  optionLabel: { padding: '10px', border: '1px solid #eee', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  btn: { padding: '10px 20px', backgroundColor: '#c471f5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  resultBox: { textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '10px', border: '1px solid #eee' },
  badge: { display: 'inline-block', padding: '5px 15px', color: 'white', borderRadius: '20px', fontWeight: 'bold', marginTop: '10px', marginBottom: '20px' }
};

export default QuizPlayer;