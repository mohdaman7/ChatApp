import React, { useState } from 'react';
import { FaReact, FaArrowRight, FaCode, FaComments, FaUsers } from 'react-icons/fa6';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const UserLogin = ({ setUser }) => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleUser = () => {
    if (!userName.trim()) {
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('user', userName);
      setUser(userName);
      localStorage.setItem('avatar', `https://picsum.photos/id/${_.random(1, 1000)}/200/300`);
      navigate('/chat');
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800 text-white">
        <div className="w-full h-full flex flex-col justify-between p-12">
          <div>
            <div className="flex items-center space-x-3">
              <FaReact className="text-3xl" />
              <h1 className="text-3xl font-bold">CodeMesh</h1>
            </div>
            <p className="mt-2 text-indigo-200">Connect • Collaborate • Code</p>
          </div>
          
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Chat with fellow developers worldwide</h2>
              <p className="text-xl text-indigo-200">Join thousands of developers discussing projects, sharing ideas, and building the future together.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <FaCode className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Share Code Snippets</h3>
                  <p className="text-indigo-200">Exchange and discuss code in real-time</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <FaComments className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Instant Messaging</h3>
                  <p className="text-indigo-200">Real-time chat with developers globally</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <FaUsers className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Community Support</h3>
                  <p className="text-indigo-200">Get help from experienced developers</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-indigo-200">
            © 2025 CodeMesh. All rights reserved.
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden justify-center mb-8">
            <div className="flex items-center space-x-2">
              <FaReact className="text-2xl text-indigo-600" />
              <h1 className="text-2xl font-bold text-indigo-600">CodeMesh</h1>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
            <div className="flex flex-col items-center space-y-8">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg">
                <FaReact className="text-4xl text-white animate-spin-slow" />
              </div>
              
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Welcome to CodeMesh
                </h1>
                <p className="text-gray-500">Sign in to start chatting</p>
              </div>
              
              <div className="w-full space-y-6">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700 block pl-1">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      type="text"
                      placeholder="Enter your unique name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                      onKeyPress={(e) => e.key === 'Enter' && handleUser()}
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleUser}
                  disabled={!userName.trim() || isLoading}
                  className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-3 rounded-xl font-medium transition-all ${
                    !userName.trim() || isLoading 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-0.5'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting...
                    </span>
                  ) : (
                    <>
                      <span>Join Chat</span>
                      <FaArrowRight className="text-sm" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-xs text-gray-500 mt-6">
                  By joining, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Having trouble signing in? <a href="#" className="text-indigo-600 hover:text-indigo-500">Contact Support</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;