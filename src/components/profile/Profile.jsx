import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import addIcon from './add.png';
import addition from './addition.png';
import folder from './folder.png';


const Profile = () => {
    const [user, setUser] = useState({});
    const [image, setImage] = useState(null);
    const [pics, setPics] = useState([])
    const [title, setTitle] = useState('');
    const [showElement, setShowElement] = useState(false);
    const fetchData = () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData)
        setPics(userData.url)
    }

    useEffect(() => {



        fetchData()


    }, []);
    const saveImage = async (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'myCloud');
        data.append('cloud_name', 'dawmir745');

        if (!image) {
            return alert('Please select an image');
        }

        // Outer try-catch for overall error handling
        try {
            // Cloudinary upload with nested try-catch
            try {
                const res = await fetch('https://api.cloudinary.com/v1_1/dawmir745/image/upload', {
                    method: 'POST',
                    body: data,
                });

                const cloudData = await res.json();
                const url = cloudData.url;

                setImage(null); // Assuming this updates the image state

                const newUrl = user.url;
                newUrl.push({"title": title,
                    "link":url});
                console.log(newUrl);

                const userData = {
                    userName: user.userName,
                    password: user.password,
                    id: user._id,
                    url: newUrl,
                    title
                };

                const userD = JSON.parse(localStorage.getItem("user"));
                userD.url = newUrl
                localStorage.setItem("user", JSON.stringify(userD))


                // Inner try-catch for server-side update
                try {
                    await fetch(`${import.meta.env.REACT_APP_SERVER_URL}/addPick`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userData),
                    });


                    setTitle("")
                    console.log('Image uploaded and user data updated successfully!'); // Success message
                } catch (serverError) {
                    console.error('Error updating user data:', serverError);
                    alert('An error occurred while updating your images. Please try again.'); // More specific message
                }
            } catch (cloudinaryError) {
                console.error('Cloudinary upload error:', cloudinaryError);
                alert('An error occurred during upload. Please try again.'); // More specific message
            }
        } catch (generalError) {
            console.error('An unexpected error occurred:', generalError);
            alert('An error occurred during the image upload process. Please try again.'); // Generic error message
        }
    };
    return (
        <div>
            <Navbar></Navbar>
            <div className="flex items-center space-x-1 p-3 bg-[#111827]">
                <img
                    src={user.profilePicture}
                    alt={user._id}
                    className="w-[200px] h-[200px] rounded-full object-cover"
                />
                <h2 className="p-2 bg-white text-lg font-semibold">{user.userName}</h2>
            </div>

            <div className={`flex justify-between items-center bg-slate-800 px-10 py-10 ${showElement ? 'hidden' : 'block'}`}>
                {pics.map((picObject, index) => (
                  <div key={index}>
                    <div className="text-white bg-[#111827] font-bold rounded-[5px]">
                        
                        <img
                            className="w-60 rounded-md object-cover"
                            src={picObject.link}
                            alt={index}
                        />
                        <div className='flex'>
                        <h1 className="text-white font-bold my-4 mx-1">
                        {picObject.title}
                        </h1>
                        </div>
                        
                    </div>
                    <div>
                    <h1 className="text-white font-bold  m-1">❤️{0}</h1>
                </div>
                  </div>

                ))}
            </div>
            <div className='flex justify-center items-center'>
                <div className="text-center">
                    <form
                        className={`w-[300px] text-center ${showElement ? 'block' : 'hidden'}`}
                        id="uploadId"
                        onSubmit={saveImage}
                    >
                        <div className="flex bg-gray-800 justify-center mt-2">
                            <label htmlFor="file-upload" className="custom-file-upload">
                                {image ? (
                                    <img
                                        className="w-72 lg:w-96 rounded-xl"
                                        src={URL.createObjectURL(image)}
                                        alt="img"
                                    />
                                ) : (
                                    <img src={addIcon} className="opacity-50 h-72 w-72" alt="Image placeholder" />
                                )}
                            </label>
                            <input
                                id="file-upload"
                                className="text-white hidden"
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div>
                            {/* <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title:
                            </label> */}
                            <input
                                type="text"
                                placeholder='Title'
                                id="title"
                                className="font-bold w-full  border border-gray-300 px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="bg-gray-800 text-center p-4">
                            <button className="w-[100px] h-[50px] bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                                Send
                            </button>
                        </div>
                    </form>

                    <div className="text-center p-3">
                        <button
                            onClick={() => setShowElement(!showElement)}
                            className="bg-[#002f94] hover:text-white px-3 py-1 rounded-md text-sm font-medium text-white"
                            type="button"
                        >
                            {showElement ? (
                                <img className="w-[25px]" src={folder} alt="folder" />
                            ) : (
                                <img className="w-[25px]" src={addition} alt="addition" />
                            )}
                        </button>
                    </div>
                </div>

            </div>



        </div>
    );
};

export default Profile;