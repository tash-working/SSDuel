import React from 'react';

const UserPost = ({picObject, index}) => {
    return (
        <div
 
        className="w-[400px] h-[620px] rounded-md border-2 border-gray-800 overflow-hidden m-3 bg-gray-800 transition duration-300 ease-in-out hover:shadow-blue-500 hover:scale-105"
      >
        <img
          src={picObject.link}
          alt={index}
          className="w-[400px] max-h-[500px] h-auto rounded-md object-cover object-top"
        />
        <div className="flex items-center justify-center rounded-b-md">
          <h1 className="text-white font-bold m-2">{picObject.title}</h1>
        </div>
        <div className="flex items-center justify-center rounded-b-md">
          <h1 className="text-white font-bold m-1">❤️{0}</h1>
        </div>
      </div>
    );
};

export default UserPost;