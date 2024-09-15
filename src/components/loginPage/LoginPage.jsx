import React, { useEffect, useState } from 'react';
import Login from '../login/Login';
import HomePage from '../home/HomePage';
import LoginForm from '../access/LoginForm';

const LoginPage = () => {
    // const name = localStorage.getItem("name");
    const [isSigned, setIsSigned] = useState(false);
    const check = JSON.parse(localStorage.getItem("isLogged"));
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    console.log(check);
    const [isLogged, setIsLogged] = useState(check);
    const [user, setUser] = useState(userData);
    const handleData = (data) => {
        // Do something with the received data
        setIsLogged(data)
        console.log(data);
    };


    useEffect(() => {
        if (isLogged) {
            document.getElementById("home").style.display = "block";
            document.getElementById("login").style.display = "none";
            console.log("loggedin");

        } else if (isLogged == false || isLogged == null) {
            document.getElementById("home").style.display = "none";
            document.getElementById("login").style.display = "block";
            console.log("not loggedin");
        }
    }, [isLogged]);

    const homeLogOut =()=>{
        console.log("lohout");
        document.getElementById("home").style.display = "none";
        document.getElementById("login").style.display = "block";
        localStorage.setItem('user', JSON.stringify({}));
        localStorage.setItem('isLogged', JSON.stringify(false));
        setIsLogged(false)
        
    }

    return (
        <div>

            <div id="login">
                <div id='signup'>
                    <Login></Login>
                    <div className='text-white text-center'>
                        <br />
                        <h1 id='loginMsg'>Do you have an ID? then just log in</h1>

                        <button onClick={() => {
                                 document.getElementById("justLogin").style.display = "block";
                                 document.getElementById("signup").style.display = "none";
                        }} className=" underline text-green-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</button>
                    </div>
                </div>
                <div className='hidden' id='justLogin'>
                    <LoginForm handleData={handleData}></LoginForm>
                    <div className='text-white text-center'>
                        <br />
                        <h1>Signup if you haven't yet</h1>

                        <button onClick={() => {
                                 document.getElementById("signup").style.display = "block";
                                 document.getElementById("justLogin").style.display = "none";
                        }} className=" underline text-green-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign up</button>
                    </div>
                </div>





            </div>

            <div id='home'>
                <HomePage getData={homeLogOut}></HomePage>
            </div>


        </div>
    );
};

export default LoginPage;