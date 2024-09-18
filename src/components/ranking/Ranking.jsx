import React, { useEffect, useState } from "react";
import io from "socket.io-client";
// const socket = io("http://localhost:5000");
// const socket = io("https://server-08ld.onrender.com");
const socket = io(`${import.meta.env.REACT_APP_SERVER_URL}`);
const Ranking = ({ handleData }) => {
  const data = "Hello from child";

  const [num, setNum] = useState(0);
  const [users, setUsers] = useState([]);
  const loging = (data) => {
    console.log(data);
    groupAndSortObject2(data);
  };

  useEffect(() => {
    const fetchData = () => {
      let array = [];

      fetch(`${import.meta.env.REACT_APP_SERVER_URL}/users`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          groupAndSortObjects(data);
          array = data;

          socket.on("receive_newUser", (data) => {
            console.log(data);
            setUsers((users) => [...users, data]);
            array.push(data);
          });

          socket.on("like_success", (data) => {
            console.log(data.filteredUpdateDocs);
            const docs = data.filteredUpdateDocs;
            for (let i = 0; i < docs.length; i++) {
              const element = docs[i];
              //    const update =
              const newTotal = element.updateOne.update.$set.total;
              const newLike = element.updateOne.update.$set.like;

              console.log(newTotal, newLike);

              const targetId = element.updateOne.filter._id; // Replace with the actual ID you want to find
              const pastUSers = [...users];

              const foundObject = array.find((obj) => obj._id === targetId);

              if (foundObject) {
                // Update the found object (adjust the update logic as needed)
                foundObject.total = newTotal;
                foundObject.like = newLike;

                // Replace the object in the array at the same index
                const index = array.indexOf(foundObject);
                array[index] = foundObject;
                console.log(array);
                //   groupAndSortObjects(array)
                loging(array);
              } else {
                console.log("Object with ID", targetId, "not found");
              }
            }
          });
        })
        .catch((error) => console.error("Error fetching users:", error)); // Handle potential errors
    };

    fetchData();
  }, []);

  const rankObjectsByLikePercentage = (objects) => {
    const rankedData = objects.map((array) => {
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

      const length = mergedArray.length - users.length;
      for (let index = 1; index <= length; index++) {
        handleData(mergedArray[mergedArray.length - index]);
      }
    }

    setUsers(mergedArray);

    // Update useState with ranked data
  };

  const rankObjectsByLikePercentage2 = (objects) => {
    const rankedData = objects.map((array) => {
      return array.sort((a, b) => {
        const likePercentageA = (a.like / a.total) * 100;
        const likePercentageB = (b.like / b.total) * 100;

        return likePercentageB - likePercentageA;
      });
    });
    // console.log(rankedData);
    const mergedArray = rankedData.reduce((acc, arr) => [...acc, ...arr], []);

    setUsers(mergedArray);

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
    Object.values(groupedObjects).forEach((group) => {
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
    rankObjectsByLikePercentage(sortedGroups);

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
    Object.values(groupedObjects).forEach((group) => {
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
    rankObjectsByLikePercentage2(sortedGroups);

    // console.log(sortedGroups);
  }

  setTimeout(() => {
    let newNum = num + 1;
    setNum(newNum);
  }, 5000);

  return (
    <div
      className="ranking-container-900 p-2 h-[500px] overflow-y-auto w-full max-w-[400px] border p-4 m-3"
    >
      <h1 className="text-center text-white text-2xl font-semibold-500 p-2">
        ranking:
      </h1>
      <div className="flex-grow overflow-y-auto">
        {users.map((user, index) => (
          <div key={index} className="bg-white p-2 rounded-lg my-2 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
              <h2 key={index} className="text-lg font-medium mr-2">
                {index + 1}:{user.userName}
              </h2>
              <h3 className="text-green-500 font-semibold sm:ml-auto">
                {user.like}-Likes
              </h3>
            </div>
            <hr className="border-b border-b-2 border-gray-300 my-4 mx-auto opacity-50" />
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">
                Rejections: {user.total - user.like}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
