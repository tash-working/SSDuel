import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import io from "socket.io-client";
// const socket = io("http://localhost:5000");
// const socket = io("https://server-08ld.onrender.com");
const socket = io(`${import.meta.env.REACT_APP_SERVER_URL}`);

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  

  const saveImage = async (event) => {
    event.preventDefault()
    document.getElementById('submitBTN').disabled = true;
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'myCloud');
    data.append('cloud_name', 'dawmir745');

    if (!image) {
      return toast.error('Please select an image');
    }

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dawmir745/image/upload', {
        method: 'POST',
        body: data,
      });

      const cloudData = await res.json();
      setUrl(cloudData.url);
      setImage(null)
      document.getElementById('username').innerText = ''
      document.getElementById('password').innerText = ''



      const userData = {
        userName: username,
        password: password,
        profilePicture: cloudData.url,
        total: 0,
        like: 0,
        url: []
      }
      socket.emit("send_user", { userData });

      alert("you have been signed up: " + username)
      document.getElementById('submitBTN').disabled = false;
      setUsername('')
      setPassword('')


      // await fetch('https://server-08ld.onrender.com/addPic', {
      // await fetch('http://localhost:5000/addUser', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(userData),
      // });

    } catch (error) {
      console.error(error);
      toast.error('An error occurred during upload. Please try again.');
    }

  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#2C3A47] p-10 rounded-xl">
        <form onSubmit={saveImage}>
          {/* Username Input */}
          <div className="mb-5">
            <label htmlFor="username">Name:</label>
            <input
              type="text"
              id="username"
              className="w-full rounded-md border border-gray-300 p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className='w-full rounded-md border border-gray-300 p-2'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Image Upload Section */}
          <h4>Image Upload</h4>

          <div className="input flex justify-center mb-5">
            <label htmlFor="file-upload" className="custom-file-upload">
              {image ? (
                <img
                  className="w-72 lg:w-96 rounded-xl"
                  src={URL.createObjectURL(image)}
                  alt="img"
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
                  className="h-20 w-20"
                  alt="Image placeholder"
                />
              )}
            </label>
            <input
              id="file-upload"
              className="text-white"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* Send Button */}
          <div className="">
            <button id='submitBTN'  className="w-72 lg:w-96 bg-[#FC427B]" type="submit">
              Sign Up
            </button>
            <Toaster />
          </div>
        </form>
        

      </div>
    </div>
  );
}

export default Login;