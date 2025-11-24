import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginRoleSelectionModal from '../../components/LoginRoleSelectionModal';

const HomePage = () => {
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
            <span className="text-blue-600 border-b-2 border-blue-600 pb-1">Home</span>
            <Link to="/courses" className="text-gray-500 hover:text-gray-900">Explore</Link>
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
        <section className="pt-24 md:pt-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="max-w-3xl mx-auto text-center text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Welcome to E-Study
            </h1>
            <p className="mt-4 text-base sm:text-lg text-indigo-100">
              Empowering learners worldwide with world-class education. Join thousands of students, instructors, and professionals on their learning journey.
            </p>
            
            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link 
                to="/register"
                className="px-6 sm:px-8 py-3 rounded-full bg-white text-gray-900 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                Get Started Free
              </Link>
              <button className="px-6 sm:px-8 py-3 rounded-full border border-indigo-100/70 text-sm font-semibold text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5"></div>
                </div>
                Watch Platform Tour
              </button>
            </div>
          </div>
        </section>

        {/* Stats Card Overlapping Hero */}
        <div className="max-w-5xl mx-auto -mt-10 md:-mt-14 px-4">
          <div className="bg-white rounded-2xl shadow-lg px-6 sm:px-10 py-6 sm:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="mt-3 text-xl sm:text-2xl font-semibold text-gray-900">50,000+</div>
                <div className="text-xs sm:text-sm text-gray-500">Active Students</div>
              </div>
              
              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="mt-3 text-xl sm:text-2xl font-semibold text-gray-900">1,200+</div>
                <div className="text-xs sm:text-sm text-gray-500">Expert Instructors</div>
              </div>
              
              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="mt-3 text-xl sm:text-2xl font-semibold text-gray-900">3,500+</div>
                <div className="text-xs sm:text-sm text-gray-500">Courses Available</div>
              </div>
              
              {/* Stat 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="mt-3 text-xl sm:text-2xl font-semibold text-gray-900">95%</div>
                <div className="text-xs sm:text-sm text-gray-500">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose E-Study Section */}
        <section className="bg-gray-50 pt-20 md:pt-28 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Why Choose E-Study?
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-500">
                Everything you need for successful online learning
              </p>
            </div>

            {/* Features Grid */}
            <div className="mt-10 md:mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Comprehensive Courses
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Access thousands of courses across various subjects taught by expert instructors.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Interactive Learning
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Engage with peers and instructors through discussions, Q&A, and live sessions.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Certifications
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Earn recognized certificates upon completion to boost your career prospects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join E-Study Today Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Why Join E-Study Today?
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-500">
                Transform your future with proven results
              </p>
            </div>

            {/* Cards Grid */}
            <div className="mt-10 md:mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center">
                  <span className="text-red-600 text-lg">🎯</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Achieve Your Goals
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Whether you're advancing your career, changing paths, or learning for fun, stay on track with guided learning paths.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="w-10 h-10 rounded-2xl bg-yellow-50 flex items-center justify-center">
                  <span className="text-yellow-600 text-lg">⚡️</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Fast-Track Your Growth
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Learn from industry experts with real-world projects and practical skills you can apply immediately.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <span className="text-indigo-600 text-lg">🛡️</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Trusted & Verified
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  All courses are carefully reviewed and verified to ensure high-quality content and up-to-date knowledge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How E-Study Works Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                How E-Study Works
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-500">
                Start your learning journey in 3 simple steps
              </p>
            </div>

            {/* Steps Grid */}
            <div className="mt-10 md:mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">
                  01
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Choose Your Course
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Browse our extensive catalog and find the perfect course for your goals.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">
                  02
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Learn at Your Pace
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Access courses anytime, anywhere and learn on your own schedule.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">
                  03
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Get Certified
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Complete courses and earn certificates to showcase your achievements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call-to-Action */}
        <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="max-w-3xl mx-auto text-center text-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Ready to Start Learning?
            </h2>
            <p className="mt-3 text-sm md:text-base text-indigo-100">
              Join thousands of learners and unlock your potential with E-Study
            </p>
            <div className="mt-8">
              <Link 
                to="/register"
                className="px-8 py-3 rounded-full bg-white text-gray-900 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                Get Started Now
              </Link>
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

export default HomePage;