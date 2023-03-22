import React, { useContext } from "react"
import { MessageBox } from './MessageBox'
import { InputMessage } from './InputMessage'
import { ChatContext } from '../context/ChatContext'


export const Chat = () => {

  const { data } = useContext(ChatContext);


  console.log  ();    
  return (
    <div className='chatbox'>
      <div className='chatHeader'>
        {data.user?.displayName}
      </div>
      <MessageBox />
      <InputMessage />
    </div>
  )
}
