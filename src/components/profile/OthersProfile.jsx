import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import addIcon from "./add.png";
import addition from "./addition.png";
import folder from "./folder.png";
import UserPost from "../userPost/UserPost";


const OthersProfile = ({id}) => {
  const uid = id
  console.log("uid:"+uid);
  
  
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [pics, setPics] = useState([]);
  const [title, setTitle] = useState("");
  const [showElement, setShowElement] = useState(false);
  const fetchData = () => {

   
    fetch(`${import.meta.env.REACT_APP_SERVER_URL}/get_user/${uid}`)
    // fetch('http://localhost:5000/users')
    
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUser(data);
        setPics(data.url);
        
      })
    
    
    
  };

  useEffect(() => {
    fetchData();
  }, [uid]);
  const saveImage = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "myCloud");
    data.append("cloud_name", "dawmir745");

    if (!image) {
      return alert("Please select an image");
    }

    // Outer try-catch for overall error handling
    try {
      // Cloudinary upload with nested try-catch
      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dawmir745/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const cloudData = await res.json();
        const url = cloudData.url;

        setImage(null); // Assuming this updates the image state
        

        const newUrl = { title: title, link: url }
  
        console.log(newUrl);

        const userData = {
          id: user._id,
         newUrl,
        };

        setTitle("");

        // Inner try-catch for server-side update
        try {
          await fetch(`${import.meta.env.REACT_APP_SERVER_URL}/addPick`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });

         const newPics = pics
         newPics.push(newUrl)
         setPics(newPics)
          console.log("Image uploaded and user data updated successfully!"); // Success message
        } catch (serverError) {
          console.error("Error updating user data:", serverError);
          alert(
            "An error occurred while updating your images. Please try again."
          ); // More specific message
        }
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        alert("An error occurred during upload. Please try again."); // More specific message
      }
    } catch (generalError) {
      console.error("An unexpected error occurred:", generalError);
      alert(
        "An error occurred during the image upload process. Please try again."
      ); // Generic error message
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <h1 className="m-5 p-2 text-slate-100 font-bold">
          <span className="underline">Profile Page</span>
        </h1>
      </div>
      <div className="flex items-center flex-wrap space-x-1 p-4 m-3 border-indigo-500/100">
        <img
          src={user.profilePicture}
          alt={user._id}
          className="w-[150px] h-[150px] rounded-full object-cover "
        />
        <div className="ml-10">
          <h2 className=" m-2 p-2 bg-white text-xl font-semibold">
            Username:{" "}
            <span className="text-lg text-slate-600">{user.userName}</span>{" "}
          </h2>
        </div>
      </div>

      <div
        className={`flex flex-wrap justify-center items-center bg-slate-900 px-10 py-10 ${
          showElement ? "hidden" : "block"
        }`}
      >
        {pics.map((picObject, index) => (
         <UserPost key={index} index={index} user={user} picObject={picObject}></UserPost>
       
        ))}
      </div>
    
    </div>
  );
};

export default OthersProfile;
