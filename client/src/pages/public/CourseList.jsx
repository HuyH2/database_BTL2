import React from 'react';

import CourseCard from '../../components/CourseCard';



const CourseList = () => {

  // Dữ liệu giả

  const courses = [

    { id: 1, title: "ReactJS Cơ bản", price: 500000, image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png" },

    { id: 2, title: "NodeJS Nâng cao", price: 1200000, image: "https://files.fullstack.edu.vn/f8-prod/courses/2.png" },

    { id: 3, title: "SQL Server 2022", price: 800000, image: "https://files.fullstack.edu.vn/f8-prod/courses/13/6200af9262b30.png" },

    { id: 4, title: "HTML CSS Pro", price: 1500000, image: "https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c63dfa.png" },

  ];



  return (

    <div style={styles.container}>

      {/* Tiêu đề Gradient Tím Hồng */}

      <h2 style={styles.heading}>✨ Khám Phá Khóa Học ✨</h2>

      

      {/* Lưới hiển thị khóa học */}

      <div style={styles.grid}>

        {courses.map(c => <CourseCard key={c.id} course={c} />)}

      </div>

    </div>

  );

};



const styles = {

  container: {

    padding: '40px 20px',

    fontFamily: "'Nunito', sans-serif",

    minHeight: '80vh', 

    backgroundColor: '#fdfdfd', 

  },

  heading: {

    textAlign: 'center',

    fontSize: '36px',

    fontWeight: '800',

    marginBottom: '40px',

    textTransform: 'uppercase',

    

    background: 'linear-gradient(to right, #c471f5, #fa71cd)',

    WebkitBackgroundClip: 'text',

    WebkitTextFillColor: 'transparent',

    

    filter: 'drop-shadow(0 2px 4px rgba(196, 113, 245, 0.3))',

  },

  grid: {

    display: 'flex',

    gap: '30px', 

    flexWrap: 'wrap',

    justifyContent: 'center', 

    maxWidth: '1200px',

    margin: '0 auto',  

  }

};



export default CourseList;