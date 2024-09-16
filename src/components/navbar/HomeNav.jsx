import React from 'react';
import { Link } from 'react-router-dom';

const HomeNav = ({ getdata }) => {
    return (
        <nav className="bg-magenta-800 p-4">
            <div className="flex justify-center">
                <div className="flex space-x-8">
                    <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Home
                    </Link>
                    <Link to="/hotornot"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Hot/Not
                    </Link>
                    <Link to="/profile"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Profile
                    </Link>
                   
                    <button onClick={getdata} className="text-gray-300 bg-red-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Log Out</button>

                </div>
            </div>
        </nav>
    );
};

export default HomeNav;