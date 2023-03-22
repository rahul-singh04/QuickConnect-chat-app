import React, { useState, useEffect, useContext } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase'
import UserContext from '../context/UserContext'
import { Userchat } from './Userchat'

export const Userchatcolumn = () => {
  const [userChats, setUserChats] = useState([]);
  const obj = useContext(UserContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", obj.currentUser.uid), (doc) => {
        setUserChats(doc.data())
      });

      return () => {
        unsub()
      }
    }
    obj.currentUser.uid && getChats()
  }, [obj.currentUser.uid])

  
  return (
    <div className='userchatColumn'>
      {Object.entries(userChats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => {
        return <Userchat chat={chat} key={chat[0]}/>
      })}
    </div>

  )
}
