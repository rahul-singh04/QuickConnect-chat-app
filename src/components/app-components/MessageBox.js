import React, {useContext, useEffect , useState} from 'react'
import { ChatContext } from '../context/ChatContext'
import  Message  from './Message'
import {db } from '../Firebase'
import { doc, onSnapshot } from "firebase/firestore";


export const MessageBox = (props) => {
  
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);


  
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const messageArr = messages.map((m)=>{
    return (
      <Message message={m} key={m.id}/>
    )
  })

  return (
    <div className='MessageBox'>
      {messageArr}
    </div>
  )
}
