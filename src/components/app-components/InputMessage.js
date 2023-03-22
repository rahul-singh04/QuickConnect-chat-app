import React, {useContext , useState} from 'react'
import attachImg from '/Users/thewithcer/learningReact/chat-app/chat-app/src/images/attach.png'
import sendBtn from '/Users/thewithcer/learningReact/chat-app/chat-app/src/images/sendBtn.png'
import { ChatContext } from '../context/ChatContext'
import UserContext from '../context/UserContext'
import { doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import {db, storage} from '../Firebase'
import {v4 as uuid} from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export const InputMessage = () => {
  const obj = useContext(UserContext)
  const {data} = useContext(ChatContext)

  const [inpText , setText] = useState('')
  const [file , setFile] = useState(null)

  async function handleSend() {
    if(file){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                inpText,
                senderId: obj.currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    }else{
      await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id:uuid(),
            inpText,
            senderId:obj.currentUser.uid,
            date:Timestamp.now()
          })
      });
    }
    await updateDoc(doc(db, "userChats", obj.currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        inpText,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        inpText,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  
    setText("");
    setFile(null);
  }

  return (
    <div className='inputMessage'>
      <input className='textMessage' type='text' value={inpText} placeholder='Enter your text message'onChange={(e)=>setText(e.target.value)}/>
      <div className='rightHandPart'>
        <input type='file' style={{ display: 'none' }} id='file' onChange={(e)=>setFile(e.target.files[0])}/>
        <label htmlFor='file'>
          <img src={attachImg} alt='' />
        </label>
        <button className='sendBtn' >
          <img src={sendBtn} alt="buttonpng" border="0" onClick={handleSend} />
        </button>
      </div>

    </div>
  )
}
