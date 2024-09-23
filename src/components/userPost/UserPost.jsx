import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const UserPost = ({ picObject, index, user }) => {
  const [userName, setUserName] = useState("")
  const [likeNoLike, setLikeNoLike] = useState(false)
  const [picObjectArray, setPicObjectArray] = useState([])
  const socket = io(import.meta.env.REACT_APP_SERVER_URL);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (picObject.likes.includes(user.userName)) {
      setLikeNoLike(true)
    }
   
    setPicObjectArray(picObject.likes)

    setUserName(user.userName)

  }, [])
  const changeLike = () => {
      if (likeNoLike) {
        setLikeNoLike(false)
        const newArray = picObjectArray.filter(element => element !== userName); // Removes elements that match the specified value
        setPicObjectArray(newArray)
        socket.emit("send_postLike", {add:false, userName , id: user._id, postId: picObject.id});

      }else{
        setLikeNoLike(true)
        const newArray = picObjectArray
        newArray.push(userName)
        setPicObjectArray(newArray)
        socket.emit("send_postLike", {add:true, userName , id: user._id, postId: picObject.id});

      }
  }
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
        <h1 className="text-white font-bold m-1">
          <button onClick={changeLike}>
            {likeNoLike ? (
              <h1>❤️</h1>
            ) : (
              <h1>♡</h1>
            )}

          </button>

          {picObjectArray.length}
        </h1>

      </div>
    </div>
  );
};

export default UserPost;