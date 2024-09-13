import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
// const socket = io("http://localhost:5000");
const socket = io("https://server-08ld.onrender.com");
const Ranking = ({ handleData }) => {


    const data = "Hello from child";



    const [num, setNum] = useState(0);
    const [users, setUsers] = useState([]);
    const loging = (data)=>{
        console.log(data);
        groupAndSortObject2(data)
        
    }

    const addUserToArray = (user) => {
        setUsers((prevArray) => [...prevArray, user]); // Use callback for consistency
    };
    useEffect(async () => {
        let array = []
        // fetch('http://localhost:5000/users')
        fetch('https://server-08ld.onrender.com/users')
            .then(res => res.json())
            .then(data => {
                console.log(data);

                groupAndSortObjects(data);
                array=data

                socket.on("receive_newUser", (data) => {
                    console.log(data);
                    setUsers((users) => [...users, data]);
                    array.push(data)
                });



                socket.on("like_success", (data) => {
                    console.log(data.filteredUpdateDocs);
                    const docs = data.filteredUpdateDocs
                    for (let i = 0; i < docs.length; i++) {
                        const element = docs[i];
                    //    const update = 
                        const newTotal = element.updateOne.update.$set.total
                        const newLike = element.updateOne.update.$set.like

                        console.log(newTotal, newLike);


                        const targetId = element.updateOne.filter._id; // Replace with the actual ID you want to find
                        const pastUSers=[...users]
                        // console.log(array.length);
                        
                        
                        // for (let i = 0; i < users.length; i++) {
                        //     console.log(users[i]._id);
                            
                            
                        // }
                        const foundObject = array.find(obj => obj._id === targetId);

                        if (foundObject) {
                          // Update the found object (adjust the update logic as needed)
                          foundObject.total = newTotal;
                          foundObject.like = newLike;

                        
                          // Replace the object in the array at the same index
                          const index = array.indexOf(foundObject);
                          array[index] = foundObject;
                          console.log(array);
                        //   groupAndSortObjects(array)
                          loging(array)
                          
                        } else {
                          console.log("Object with ID", targetId, "not found");
                        }
                        

                        // if (foundObject) {
                        //     console.log("Found object:", foundObject);
                        // } else {
                        //     console.log("Object with ID", targetId, "not found");
                        // }
                        

                    }

                });



            })
            .catch(error => console.error('Error fetching users:', error)); // Handle potential errors




        //   socket.on("receive_newUser", (data) => {
        //     console.log(data);
        //     setUsers((users) => [...users, data]);
        //   });

        // Cleanup function: Disconnect from socket on component unmount
        // return () => {

        //   socket.disconnect();
        // };
    }, []);




    const rankObjectsByLikePercentage = (objects) => {
        const rankedData = objects.map(array => {
            return array.sort((a, b) => {
                const likePercentageA = (a.like / a.total) * 100;
                const likePercentageB = (b.like / b.total) * 100;

                return likePercentageB - likePercentageA;
            });
        });
        // console.log(rankedData);
        const mergedArray = rankedData.reduce((acc, arr) => [...acc, ...arr], []);


        if (mergedArray.length > users.length) {
            // console.log(mergedArray[mergedArray.length-1]);

            const length = mergedArray.length - users.length
            for (let index = 1; index <= length; index++) {


                handleData(mergedArray[mergedArray.length - index])



            }


        }

        setUsers(mergedArray)


        // Update useState with ranked data
    };


    const rankObjectsByLikePercentage2 = (objects) => {
        const rankedData = objects.map(array => {
            return array.sort((a, b) => {
                const likePercentageA = (a.like / a.total) * 100;
                const likePercentageB = (b.like / b.total) * 100;

                return likePercentageB - likePercentageA;
            });
        });
        // console.log(rankedData);
        const mergedArray = rankedData.reduce((acc, arr) => [...acc, ...arr], []);


      
        setUsers(mergedArray)


        // Update useState with ranked data
    };



    //   const rankedObjects = rankObjectsByLikePercentage(objects);

    //   console.log(rankedObjects);

    function groupAndSortObjects(objects) {
        // Group objects by like value
        const groupedObjects = objects.reduce((acc, obj) => {
            const like = obj.like;
            acc[like] = acc[like] || [];
            acc[like].push(obj);
            return acc;
        }, {});

        // Sort each group by total (descending)
        Object.values(groupedObjects).forEach(group => {
            group.sort((a, b) => b.total - a.total);
        });

        // Convert grouped objects to an array and sort by like (descending)
        const sortedGroups = Object.entries(groupedObjects)
            .sort((a, b) => b[0] - a[0])
            .map(([like, group]) => group);

        // Move the group with the largest like to the front
        const largestLikeGroup = sortedGroups.shift();
        sortedGroups.unshift(largestLikeGroup);

        // return sortedGroups;
        rankObjectsByLikePercentage(sortedGroups)

        // console.log(sortedGroups);

    }
    function groupAndSortObject2(objects) {
        // Group objects by like value
        const groupedObjects = objects.reduce((acc, obj) => {
            const like = obj.like;
            acc[like] = acc[like] || [];
            acc[like].push(obj);
            return acc;
        }, {});

        // Sort each group by total (descending)
        Object.values(groupedObjects).forEach(group => {
            group.sort((a, b) => b.total - a.total);
        });

        // Convert grouped objects to an array and sort by like (descending)
        const sortedGroups = Object.entries(groupedObjects)
            .sort((a, b) => b[0] - a[0])
            .map(([like, group]) => group);

        // Move the group with the largest like to the front
        const largestLikeGroup = sortedGroups.shift();
        sortedGroups.unshift(largestLikeGroup);

        // return sortedGroups;
        rankObjectsByLikePercentage2(sortedGroups)

        // console.log(sortedGroups);

    }



    setTimeout(() => {
        let newNum = num + 1;
        setNum(newNum)
    }, 5000);





    return (
        <div className='bg-green-900 p-2 h-[500px] overflow-y-auto'>


            <h1 className='my-2 bg-green- 500 p-2'>ranking:</h1>
            {
                users.map((user, index) => (

                    <div key={index} className='my-2 bg-white p-2'>

                        <h2 key={index}>{index + 1}: {user.userName}</h2>
                        <h3>Likes: {user.like}</h3>
                        <h3>Rejections: {user.total - user.like}</h3>
                    </div>

                ))
            }
        </div>
    );
};

export default Ranking;
