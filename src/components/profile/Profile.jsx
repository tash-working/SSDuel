import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';

const Profile = () => {
    const [user, setUser] = useState({});

    const fetchData = () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData)
    }

    useEffect(() => {



        fetchData()


    }, []);
    return (
        <div>
            <Navbar></Navbar>
            <div className="flex items-center space-x-2 p-3 bg-green-600">
                <img
                    src={user.profilePicture}
                    alt={user._id}
                    className="w-[200px] h-[200px] rounded-full object-cover"
                />
                <h2 className="text-lg font-semibold">{user.userName}</h2>
            </div>
            <div className="h-screen w-full  flex justify-center items-center">
                <div className='text-center'>
                    <h1 className="text-white text-4xl font-bold">This section is under construction</h1>
                   
                    <h1 className="text-white text-[200px] font-bold">🚧</h1>
                </div>
            </div>

        </div>
    );
};

export default Profile;