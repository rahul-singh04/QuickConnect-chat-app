import React, { useContext } from 'react'
import  UserContext  from '../context/UserContext';

export const Sidenav = () => {
  const obj = useContext(UserContext)
  return (
    <div className='Sidenav'>
        <span style={{fontWeight:'bold' ,fontSize:'1.1rem'}}>QuickConnect</span>
        <div className='userInfo'>
            <img src={obj.currentUser.photoURL} alt=''></img>
            <span>{obj.currentUser.displayName}</span>
        </div>
    </div>
  )
}
