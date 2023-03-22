import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import React ,{useContext} from 'react'
import UserContext from '../context/UserContext'
import {db} from '../Firebase'

export const Searchchat = (props) => {
  const obj = useContext(UserContext)
  // console.log(obj.currentUser.uid);
  const handleClick = async ()=>{
    
    const combinedUID = obj.currentUser.uid > props.userFound.uid ?obj.currentUser.uid+props.userFound.uid :props.userFound.uid+ obj.currentUser.uid ;

    try {
      const res = await getDoc(doc(db , "chats" ,combinedUID))
      if(!res.exists()){
        await setDoc(doc (db, 'chats' , combinedUID) , {messages :[]})

        await updateDoc(doc(db , 'userChats' , obj.currentUser.uid),{
          [combinedUID+'.userInfo'] :{
            uid :props.userFound.uid,
            displayName :props.userFound.displayName,
            photoURL :props.userFound.photoURL
          },
          [combinedUID+'.date'] :serverTimestamp()
        });
        console.log(`combinedID: ${combinedUID}  searchedUser :${props.userFound.uid} name: ${obj.currentUser.displayName}`);
        await updateDoc(doc(db , 'userChats' , props.userFound.uid),{
          [combinedUID+'.userInfo'] :{
            uid :obj.currentUser.uid,
            displayName :obj.currentUser.displayName,
            photoURL :obj.currentUser.photoURL
          },
          [combinedUID+'.date'] :serverTimestamp()
        });

      }
    } catch (error) {
      console.log(error);
    }

    props.setuserFound(null);
    props.setSearchName('')
  }
//  console.log(obj.currentUser.displayName);
  

  return (
    <>{props.userFound &&
      <div className='userChatInfo dark' onClick={handleClick}>
        <img src={props.userFound.photoURL} alt='' />
        <span className='userName' style={{ fontWeight: 'bold' }}>{props.userFound.displayName}</span>
      </div>}

    </>
  )
}
