import React ,{useContext}from 'react'
import { ChatContext } from '../context/ChatContext';

export const Userchat = (props) => {
   const {dispatch} = useContext(ChatContext)

  function handleClick(u){
      // console.log('clicked'); 
      dispatch({type :'CHANGE_USER' , payload :u})
  }
  return (
    <>
    <div className='userChatInfo' onClick={()=>handleClick(props.chat[1].userInfo)}>
        <img src={props.chat[1].userInfo?.photoURL} alt=''/>
        <span className='userName' style={{fontWeight:'bold'}}>{props.chat[1].userInfo?.displayName}</span>
        <span className='lastMessage'>{props.chat[1].lastMessage?.inpText}</span>
    </div>
    </>
  )
}
