// src/components/Header.jsx
import React from 'react';

const Header = () => {
    return (
        <header className="flex justify-between items-center bg-[#1c3456] p-4 shadow-xl">
            <div className="text-xl font-bold text-white">
                NG Solutions
            </div>
            
            <nav className="flex space-x-6 text-gray-200 font-medium">
                <a href="#" className="hover:text-blue-400">Home</a>
                <a href="#" className="hover:text-blue-400">Instructions</a>
                <a href="#" className="hover:text-blue-400">Management Tools</a>
            </nav>
            
            <button className="text-white hover:text-red-400 font-medium">
                SignOut
            </button>
        </header>
    );
};

export default Header;