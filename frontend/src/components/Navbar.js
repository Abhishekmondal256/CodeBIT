import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext(); // Get user from context

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex bg-[#161A1E] items-center justify-between px-8 lg:px-16 xl:px-20">
      {/* Logo Section */}
      <div className="flex items-center justify-start ml-2 lg:ml-4 h-full">
        <span className="font-bold text-[3vh] lg:text-[4vh] text-[#0DB276]">Code</span>
        <img
          src="images/logo.webp"
          alt="logo"
          className="h-[3vh] lg:h-[4vh] w-[3vw] lg:w-[4vw]"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap gap-6 lg:gap-12 px-4 lg:px-10 items-center justify-center text-lg lg:text-xl font-semibold text-[#0DB276] h-[50px] my-4 mx-2 lg:mx-6">
        <div
          onClick={() => navigate('/')}
          className="px-2 py-1 border-l-[2px] border-r-[2px] border-[#161A1E] hover:border-[#0DB276] hover:cursor-pointer transition duration-200"
        >
          Events
        </div>
        <div
          onClick={() => navigate('/contest')}
          className="px-2 py-1 border-l-[2px] border-r-[2px] border-[#161A1E] hover:border-[#0DB276] hover:cursor-pointer transition duration-200"
        >
          Contest
        </div>
        <div
          onClick={() => navigate('/hackathon')}
          className="px-2 py-1 border-l-[2px] border-r-[2px] border-[#161A1E] hover:border-[#0DB276] hover:cursor-pointer transition duration-200"
        >
          Hackathons
        </div>

        {/* Login / Logout Button */}
        {!user ? (
          <button
            onClick={() => navigate('/login')}
            className="ml-4 border-[2px] lg:border-[3px] text-[#0DB276] border-[#0DB276] px-5 lg:px-7 py-1 rounded-lg hover:border-[#0DB276] transition duration-200"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="ml-4 border-[2px] lg:border-[3px] text-[#0DB276] border-[#0DB276] px-5 lg:px-7 py-1 rounded-lg hover:border-[#0DB276] transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;