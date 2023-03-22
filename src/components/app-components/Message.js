import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext';
import UserContext from '../context/UserContext';

export default function Message (props) {
  const ref = useRef();
  const obj = useContext(UserContext); //fetchs logged in user
  const { data } = useContext(ChatContext); //fetch the other user logged in user has conversation with

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.message]);

  console.log( );
  return (
    <>
      <div ref={ref} className= {props.message.senderId === obj.currentUser.uid ? 'message sender' : 'message'}>
        <img src={props.message.senderId === obj.currentUser.uid ?
        obj.currentUser.photoURL : data.user.photoURL} alt='' />
        <span className='msgtime'>{props.message.date.toDate().toLocaleTimeString([],{ hour12: false,}).substring(0,5)}</span>
        <div className='actualMsgPart'>
          <div className='messageTextPart sender'>
            <span style={props.message.inpText ==='' ?{ display:'none'} :{display:'block'}}>{props.message.inpText}</span>
          </div>
          <div className='messageImgPart'>
            { props.message.img && <img src={props.message.img} alt='' />}
          </div>
        </div>

      </div>
    </>

  )
}
