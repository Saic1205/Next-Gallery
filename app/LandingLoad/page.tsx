import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="loading-container text-white relative text-center">
        <div className="loading-text flex justify-center space-x-2 text-5xl font-bold tracking-wider mb-8">
          {['N', 'E', 'X', 'T', ' ', 'G', 'A','L','L','E','R','Y','!'].map((char, index) => (
            <span
              key={index}
              className="inline-block animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
      <div className="socials fixed bottom-4 right-4 flex items-center">
        <a className="social-link text-white flex items-center cursor-pointer no-underline mr-3" href="https://twitter.com/aybukeceylan" target="_top">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
          </svg>
        </a>
        <a className="social-link text-white flex items-center cursor-pointer no-underline mr-3" href="https://www.linkedin.com/in/ayb%C3%BCkeceylan/" target="_top">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default LoadingScreen;
