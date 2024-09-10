import React, { useEffect, useState } from 'react';

const Ranking = () => {




    const [num, setNum] = useState(0);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {

                groupAndSortObjects(data)
            })
            .catch(error => console.error('Error fetching users:', error)); // Handle potential errors
    }, [num]);




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

        // console.log(mergedArray);
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



    setTimeout(() => {
        let newNum = num+1;
        setNum(newNum)
      }, 500);





    return (
        <div className='bg-green-900 p-2'>
           
            <h1 className='my-2 bg-green-500 p-2'>ranking:</h1>
            {
                users.map((user, index) => (

                    <div key={index} className='my-2 bg-white p-2'>

                    <h2  key={index}>{index+1}: {user.userName}</h2>
                    <h3>Likes: {user.like}</h3>
                    <h3>Rejections: {user.total - user.like}</h3>
                    </div>

                ))
            }
        </div>
    );
};

export default Ranking;