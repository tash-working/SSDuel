import React from 'react';
import Navbar from '../navbar/Navbar';
import HomeNav from '../navbar/HomeNav';

const Feed = ({ getData }) => {
    const logout = () => {

        getData()
    
      }
    return (
        <div>
          
          <HomeNav getdata={logout}></HomeNav>
          <div className="h-screen w-full  flex justify-center items-center">
                <div className='text-center'>
                    <h1 className="text-white text-4xl font-bold">This section is under construction</h1>
                   
                    <h1 className="text-white text-[200px] font-bold">🚧</h1>
                </div>
            </div>
        </div>
    );
};

export default Feed;