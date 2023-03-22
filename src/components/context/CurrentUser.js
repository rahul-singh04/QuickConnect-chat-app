import React, { useState , useEffect} from 'react'
import UserContext from './UserContext'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from '../Firebase'

export const CurrentUser = (props) => {

    const [currentUser , setCurrentUser] = useState({})

    useEffect(() => {
       const authChange = onAuthStateChanged(auth , (user) =>{
            setCurrentUser(user);
        })
        return ()=>{
            authChange()
        }
    }, [])
  
  return (
    <UserContext.Provider value={{currentUser}}>
        {props.children}
    </UserContext.Provider>
  )
}
