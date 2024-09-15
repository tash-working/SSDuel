import React, { useEffect, useState } from 'react';
import Login from '../login/Login';
import HomePage from '../home/HomePage';
import LoginForm from '../access/LoginForm';

const LoginPage = () => {
    // const name = localStorage.getItem("name");
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

    return (
        <div>

            <div id="login">
                <LoginForm handleData={handleData}></LoginForm>
                <Login></Login>
            </div>
            
            <div id='home'>
                <HomePage isLogged={isLogged} user={user}></HomePage>
            </div>


        </div>
    );
};

export default LoginPage;