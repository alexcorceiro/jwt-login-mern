import React, {useEffect, useState} from 'react';
import "../styles/home.css";
import users from "../image/user.png"
import axios from 'axios';

axios.defaults.withCredentials = true ;
let firstRender = true;

function Welcome() {
  const [user, setUser ]= useState()
 
  const refreshToken = async() => {
    const res = await axios.get('http://localhost:5000/api/refresh', {
      withCredentials: true
    }).catch(err => console.log(err))
    const data = await res.data;
    return data;
  }
  const sendrequest = async() => {
    const res = await axios.get('http://localhost:5000/api/user', {
      withCredentials: true , 
    }).catch(err => console.log(err))
    const data = await res.data;
    return data;
  }
  useEffect(() => {
        if(firstRender) {
          firstRender = false;
          sendrequest().then((data) => setUser(data.user))
        }
        let interval = setInterval(() =>{
          refreshToken().json(data => setUser(data.user))
        }, 1000 * 30)

        return () => clearInterval(interval)
      }, []);

  
  return (
    <div className='page-home'>
        <div className='home'>
          <h2>ulisateur</h2>
          <img className="image-home" src={users} alt="user"/>
          {user && 
          <h2>nom : {user.name}</h2>}
        </div>
    </div>
  )
}

export default Welcome;
