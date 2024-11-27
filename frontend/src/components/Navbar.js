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
    <div className='flex bg-[#161A1E] items-center justify-between px-16'>
      <div className='flex items-center justify-start ml-[15px] h-full'>
        <span className='font-bold text-[4vh] text-[#0DB276]'>Code</span>
        <img src="images/logo.webp" alt='logo' className='h-[4vh] w-[4vw]' />
      </div>
      <div className='flex flex-wrap gap-12 px-10 items-center justify-center text-xl font-semibold text-[#0DB276] h-[50px] my-4 mx-6'>
        <div onClick={() => navigate('/')} className="px-2 py-1 border-l-[2px] border-r-[2px] border-[#161A1E] hover:border-l-[2px] hover:border-r-[2px] hover:border-[#0DB276] hover:cursor-pointer transition delay-100">
          Events
        </div>
        <div onClick={() => navigate('/contest')}className="px-2 py-1 border-l-[2px] border-r-[2px] border-[#161A1E] hover:border-l-[2px] hover:border-r-[2px] hover:border-[#0DB276] hover:cursor-pointer transition delay-100">
          Contest
        </div>
        <div onClick={() => navigate('/hackathon')}className="px-2 py-1 border-l-[2px] border-r-[2px] border-[#161A1E] hover:border-l-[2px] hover:border-r-[2px] hover:border-[#0DB276] hover:cursor-pointer transition delay-100">
          Hackathons
        </div>

        {/* If user is logged in, show Logout button, else show Login button */}
        {!user ? (
          <button
            onClick={() => navigate('/login')}
            className="ml-4 border-[3px] text-[#0DB276] bg-[] border-[#0DB276] px-7 py-1 rounded-lg hover:border-[#0DB276] transition delay-100"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="ml-4 border-[3px] text-[#0DB276] bg-[] border-[#0DB276] px-7 py-1 rounded-lg hover:border-[#0DB276] transition delay-100"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
