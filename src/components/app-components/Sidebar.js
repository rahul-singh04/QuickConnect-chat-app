import React, { useState , useEffect} from 'react'
import { Sidenav } from './Sidenav'
import { Userchatcolumn } from './Userchatcolumn'
import { Searchchat } from './Searchchat'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../Firebase'

export const Sidebar = () => {
    const [searchName, setSearchName] = useState('')
    const [userFound, setuserFound] = useState(null)
   
    const [err, setErr] = useState(false)
   

    useEffect( () => {
       search()
      if(searchName.length === 0){
        setuserFound(null)
      }
    }, [searchName])

    async function search (){
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("displayName", '==', searchName));
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setuserFound(doc.data())
            });
        }catch(err){
            setErr(err)
        }
    }
    // console.log(userFound);

    return (
        <div className='sidebar'>
            <Sidenav />
            <input type='text' value={searchName} placeholder='Search' onChange={(e) => setSearchName(e.target.value)} />
            <Searchchat  userFound={userFound} setuserFound={setuserFound} setSearchName={setSearchName} searchName={searchName}/>
            <Userchatcolumn />
        </div>
    )
}
