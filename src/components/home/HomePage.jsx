import React, { useEffect, useState } from 'react';
import Ranking from '../ranking/Ranking';
import io from "socket.io-client";
// const socket = io("http://localhost:5000");
const socket = io("https://server-08ld.onrender.com");


const HomePage = () => {
  const [numbers, setNumbers] = useState([]);
  const [users, setUsers] = useState([]);
  const [point, setPoint] = useState([0,0]);





  function generateRandomNumbers(arrayLength) {
    const randomNumbers = [];
    while (randomNumbers.length < 2) {
      const randomNumber = Math.floor(Math.random() * arrayLength);
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    setNumbers(randomNumbers);
  }

  useEffect(() => {
    fetch('https://server-08ld.onrender.com/users')
    // fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        // console.log(data);

        setUsers(data);
        generateRandomNumbers(data.length);

        socket.on("receive_newUser", (data) => {
          // console.log(data);
          setUsers((users) => [...users, data]);
        });
      })
      .catch(error => console.error('Error fetching users:', error)); // Handle potential errors
  }, []);




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

    fetch(`https://server-08ld.onrender.com/update`, {
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
      } while (numbers.includes(number)); // Keep generating until the number is not 5
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
      const new_point= [...point]
      new_point[0] = 1
      console.log(new_point)
      getUsersByPositions(new_point)

    } else if (index === 1) {
      console.log("2nd gets like");
      const new_array = [...numbers]
      new_array[0] = randomNumber
     
      setNumbers(new_array)
      const new_point= [...point]
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
    <div className=' w-50 flex justify-between item-center bg-slate-800 px-10 py-10'>
      
      {numbers.map((number, index) => (
        <div key={index} >
          <h1
            className='text-white py-4 px-4 bg-green-600 font-bold w-fit m-4'
            key={index} // Use index for key prop in this case
          >
            {users[number].userName} like: {users[number].like} Rejections: {users[number].total - users[number].like}
          </h1>
          <img className='w-60' onClick={changeSidePic} src={users[number].profilePicture} alt={number} />
        </div>
      ))}
      <div>
        <Ranking handleData={handleData}></Ranking>
      </div>
      
    </div>
  );
};

export default HomePage;