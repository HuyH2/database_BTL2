import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginRoleSelectionModal from '../../components/LoginRoleSelectionModal';

// Sample course data
const courses = [
  {
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    category: "Development",
    level: "Beginner",
    rating: 4.8,
    students: "45,230",
    duration: "52 hours",
    price: "$89.99",
    description: "Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js and more.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop"
  },
  {
    title: "UI/UX Design Masterclass",
    instructor: "Sarah Johnson",
    category: "Design",
    level: "Intermediate",
    rating: 4.9,
    students: "32,450",
    duration: "38 hours",
    price: "$79.99",
    description: "Master UI/UX design principles, Figma, prototyping, and user research techniques.",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop"
  },
  {
    title: "Data Science with Python",
    instructor: "Prof. Michael Chen",
    category: "Data Science",
    level: "Intermediate",
    rating: 4.7,
    students: "28,750",
    duration: "65 hours",
    price: "$99.99",
    description: "Complete data science course covering pandas, NumPy, machine learning, and data visualization.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
  },
  {
    title: "Digital Marketing Strategy",
    instructor: "Lisa Thompson",
    category: "Marketing",
    level: "Beginner",
    rating: 4.6,
    students: "19,850",
    duration: "25 hours",
    price: "$69.99",
    description: "Learn digital marketing fundamentals, SEO, social media marketing, and analytics.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop"
  },
  {
    title: "Business Leadership Excellence",
    instructor: "Robert Davis",
    category: "Business",
    level: "Advanced",
    rating: 4.8,
    students: "15,320",
    duration: "42 hours",
    price: "$129.99",
    description: "Advanced leadership strategies, team management, and organizational development techniques.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop"
  },
  {
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Priya Patel",
    category: "Data Science",
    level: "Advanced",
    rating: 4.9,
    students: "22,100",
    duration: "78 hours",
    price: "$149.99",
    description: "Deep dive into machine learning algorithms, neural networks, and AI implementation.",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop"
  }
];

const CourseList = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Fixed Navbar */}
      <header className="fixed top-0 inset-x-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-2xl bg-purple-500 flex items-center justify-center text-white text-lg">
              🎓
            </div>
            <span className="ml-2 font-semibold text-lg">E-Study</span>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <Link to="/" className="text-gray-500 hover:text-gray-900">Home</Link>
            <span className="text-blue-600 border-b-2 border-blue-600 pb-1">Explore</span>
            <Link to="/register" className="text-gray-500 hover:text-gray-900">Join</Link>
          </nav>

          {/* Right Auth Buttons */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50"
            >
              Sign In
            </button>
            <Link 
              to="/register" 
              className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-full hover:bg-black"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-24 md:pt-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Explore Courses
            </h1>
            <p className="mt-3 text-sm md:text-base text-indigo-100">
              Discover thousands of courses to advance your skills
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-3xl">
              <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-lg">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search for courses, instructors..." 
                  className="flex-1 border-none outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="bg-gray-50 py-10 md:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[260px,minmax(0,1fr)] gap-8">
              
              {/* Left Column - Filters Sidebar */}
              <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  <h3 className="text-base font-semibold text-gray-900">Filters</h3>
                </div>

                {/* Category Filters */}
                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Category</h4>
                  <div className="space-y-1">
                    <button className="mt-3 w-full text-left px-3 py-2 rounded-xl text-sm font-medium bg-indigo-50 text-indigo-600">
                      All
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                      Development
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                      Design
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                      Business
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                      Data Science
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                      Marketing
                    </button>
                  </div>
                </div>

                {/* Level Filters */}
                <div className="mt-8">
                  <h4 className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Level</h4>
                  <div className="space-y-1">
                    <button className="mt-3 w-full text-left px-3 py-2 rounded-xl text-sm font-medium bg-indigo-50 text-indigo-600">
                      All
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                      Beginner
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                      Intermediate
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                      Advanced
                    </button>
                  </div>
                </div>
              </aside>

              {/* Right Column - Courses List */}
              <div>
                <p className="text-sm text-gray-500 mb-4">Showing 6 courses</p>
                
                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
                  {courses.map((course, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                      {/* Course Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={course.imageUrl} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Category Pill */}
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
                          {course.category}
                        </div>
                        {/* Favorite Button */}
                        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>

                      {/* Course Body */}
                      <div className="p-5 sm:p-6 flex flex-col flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                          {course.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          by {course.instructor}
                        </p>
                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                          {course.description}
                        </p>

                        {/* Stats Row */}
                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {course.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            {course.students}
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {course.duration}
                          </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="mt-4 flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                            {course.level}
                          </span>
                          <span className="text-base font-semibold text-gray-900">
                            {course.price}
                          </span>
                        </div>

                        {/* Enroll Button */}
                        <div className="mt-4">
                          <button className="w-full flex items-center justify-center gap-2 rounded-full bg-gray-900 text-white text-sm font-medium py-3 hover:bg-black">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 006 16h12M16 16v4a2 2 0 11-4 0m4-4a2 2 0 11-4 0m4-4H8" />
                            </svg>
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400 text-center">
          © 2025 E-Study. All rights reserved.
        </div>
      </footer>

      {/* Login Role Selection Modal */}
      <LoginRoleSelectionModal 
        open={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default CourseList;