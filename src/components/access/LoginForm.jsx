import React, { useState } from 'react';

function LoginForm({handleData}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, e.g., send data to server
        console.log('Username:', username);
        console.log('Password:', password);

        fetch(`${import.meta.env.REACT_APP_SERVER_URL}/get_user/${username}/${password}`)
        // fetch('http://localhost:5000/users')
        
          .then(res => res.json())
          .then(data => {
                if (data.permission) {
                    console.log(data.item);
                    localStorage.setItem('user', JSON.stringify(data.item));
                    localStorage.setItem('isLogged', data.permission);
                    handleData(data.permission)

                   


                    
                }else{
                    alert("inc")
                    
                }
    
         
          })

        
    };

    const handleUsernameChange = (e) => {
        // Remove spaces from the username input
        const newUsername = e.target.value.replace(/\s/g, '');
        setUsername(newUsername);

    };

   

    return (
        <div className="flex justify-center items-center h-screen">
        <div className="bg-[#2C3A47] p-10 rounded-xl">
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                className='w-full rounded-md border border-gray-300 p-2' type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                required
            />
            <br />
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
            
            <br />
            
            <button className="w-72 lg:w-96 bg-[#FC427B]" type="submit">Submit</button>
        </form>
        </div>
      </div>
        
    );
}

export default LoginForm;