import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import OthersProfile from './OthersProfile';

const MutualProfile = () => {
    const [isOwnId, setIsOwnId] = useState(false);
    
  const { id } = useParams();
  console.log(id);
  const fetch = () =>{
    const userData = JSON.parse(localStorage.getItem("user"));
    const isLogged = JSON.parse(localStorage.getItem("isLogged"));
    if (isLogged && id===userData._id) {
        console.log("own id");
        setIsOwnId(true)
        
      }else if (!isLogged ||  id!==userData._id) {
        console.log("not own id");
        setIsOwnId(false)
      }
  }
  useEffect(()=>{
    fetch()
  })

    return (
       <div>
            {isOwnId ? (
               <Profile id={id}></Profile>
              ) : (
                <OthersProfile id={id}></OthersProfile>
              )}
       </div>
    );
};

export default MutualProfile;