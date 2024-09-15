import React, { useEffect, useState } from 'react';
import Ranking from '../ranking/Ranking';
import io from "socket.io-client";
import Navbar from '../navbar/Navbar';
// const socket = io("http://localhost:5000");
// const socket = io("https://server-08ld.onrender.com");
const socket = io(import.meta.env.REACT_APP_SERVER_URL);

const HomePage = ({ isLogged, user }) => {





  const [numbers, setNumbers] = useState([]);
  const [users, setUsers] = useState([]);


  const [point, setPoint] = useState([0, 0]);





  function generateRandomNumbers(arrayLength, data) {


    const randomNumbers = [];
    while (randomNumbers.length < 2) {
      const randomNumber = Math.floor(Math.random() * arrayLength);
      console.log(data[randomNumber]);

      if (!randomNumbers.includes(randomNumber) && data[randomNumber].profilePicture !== user.profilePicture) {
        randomNumbers.push(randomNumber);
      }
    }
    setNumbers(randomNumbers);

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_SERVER_URL}/users`);
        if (!response.ok) {
          throw new Error(`Network response was not ok (status ${response.status})`);
        }
        const data = await response.json();
  
        setUsers(data);
        generateRandomNumbers(data.length, data);
  
        socket.on("receive_newUser", (newUser) => {
          // console.log(newUser);
          setUsers((users) => [...users, newUser]);
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchData();
  }, [socket]);


  function getUsersByPositions(point) {
    console.log(point);

    const data = [];
    // const newTotal = 

    for (let i = 0; i < numbers.length; i++) {



      const new_object = {
        new_id: users[numbers[i]]._id,
        new_total: users[numbers[i]].total += 1,
        new_like: users[numbers[i]].like += point[i]
      }
      // console.log(users[numbers[i]]);
      data.push(new_object)
      // console.log(users[numbers[i]].total);



    }


    socket.emit("send_like", { data });

    // fetch(`https://server-08ld.onrender.com/update`, {
    fetch(`${import.meta.env.REACT_APP_SERVER_URL}/users`, {
      // fetch(`http://localhost:5000/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });




  }



  const changeSidePic = (e) => {


    const pastNum = parseInt(e.target.alt)

    const array = [...numbers]



    function generateRandomNumber() {


      let number;
      do {
        number = Math.floor(Math.random() * users.length); // Generate a number between 0 and 5
      } while (numbers.includes(number) || users[number].profilePicture === user.profilePicture); // Keep generating until the number is not 5
      return number;
    }

    const randomNumber = generateRandomNumber();

    const index = array.indexOf(pastNum)

    // console.log(users);


    if (index === 0) {
      console.log("1st gets like");
      const new_array = [...numbers]
      new_array[1] = randomNumber

      setNumbers(new_array)
      const new_point = [...point]
      new_point[0] = 1
      console.log(new_point)
      getUsersByPositions(new_point)

    } else if (index === 1) {
      console.log("2nd gets like");
      const new_array = [...numbers]
      new_array[0] = randomNumber

      setNumbers(new_array)
      const new_point = [...point]
      new_point[1] = 1
      console.log(new_point)
      getUsersByPositions(new_point)
    }

    // getUsersByPositions(point)
    // console.log(point);






  };


  const handleData = (data) => {
    // Do something with the received data
    const newUser = [...users]
    newUser.push(data)
    setUsers(newUser)
    // console.log(data);
  };

  return (

    <>
    <Navbar></Navbar>
      <div className=' w-50 flex justify-between item-center bg-slate-800 px-10 py-10'>

        {numbers.map((number, index) => (
          
          <div key={index} className="flex flex-col items-center justify-center py-4 px-4 bg-white font-bold">
          <h1 className="text-white py-4 px-4 bg-green-600 font-bold w-fit m-4 rounded-md">
            {users[number].userName} ❤️ {users[number].like} 🗑️ {users[number].total - users[number].like}
          </h1>
        
          <img
            className="w-[200px] rounded-md object-cover"
            onClick={changeSidePic}
            src={users[number].profilePicture}
            alt={number}
          />
        </div>
        ))}
        <div>
          <Ranking handleData={handleData} isLogged={isLogged}></Ranking>
        </div>


      </div>

    </>
  );
};

export default HomePage;