import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Home: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-xl font-bold">Authentication System</h1>
            </div>
            
            <nav className="flex items-center space-x-4">
              {isAuthenticated && (
                <>
                  <span className="text-gray-300">Welcome, {user?.name}</span>
                  <Link
                    to="/profile"
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    Profile
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 border border-gray-700 mb-8 animate-slide-down">
            <span className="text-green-400 mr-2">✓</span>
            <span className="text-sm">Secure • Fast • Modern</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-slide-up">
            Authentication
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              System
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-slide-up-delay">
            A complete, secure authentication solution built with modern technologies. 
            Features JWT tokens, email verification, password reset, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border border-gray-600 hover:border-gray-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-800"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/profile"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 animate-fade-in-up">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure Authentication</h3>
            <p className="text-gray-400">JWT tokens with refresh capability, bcrypt password hashing, and secure session management.</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Email Verification</h3>
            <p className="text-gray-400">Automated email verification system with secure token-based confirmation process.</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Password Recovery</h3>
            <p className="text-gray-400">Secure password reset functionality with time-limited tokens and email delivery.</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-20 text-center animate-fade-in-up-delay">
          <h2 className="text-2xl font-semibold mb-8 text-gray-300">Built with Modern Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Node.js', 'TypeScript', 'React', 'MongoDB', 'JWT', 'Tailwind CSS'].map((tech, index) => (
              <span
                key={tech}
                className={`px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm font-medium hover:border-gray-600 transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Authentication System. Built with modern web technologies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
