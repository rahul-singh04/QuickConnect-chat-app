
import React, { useState } from "react";
import avatarAdd from '/Users/thewithcer/learningReact/chat-app/chat-app/src/images/avatarAdd.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "/Users/thewithcer/learningReact/chat-app/chat-app/src/components/Firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    // const [loading, setLoading] = useState('');  
    const navigate = useNavigate();

    const [err, setErr] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${name + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName:name,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName:name,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/chat");
                        props.setLoginModalState(false)
                        props.setLoggedIn(true)
                    } catch (err) {
                        setErr(true);
                        // setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            // setLoading(false);
        }
    }


    

    return (
        <div className="auth-form-container">
            <i class="fa-solid fa-xmark closeIcon" onClick={() => props.setLoginModalState(false)}></i>
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@xyz.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <label htmlFor="file">
                    <img src={avatarAdd} className='avatarAdd' alt=''></img>
                    <span>Add an avatar</span>
                </label>
                <input type='file' className="inputFile" id='file' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])}></input>
                <button type="submit" class="btn btn-success loginBtn">Register</button>
                {err && <span style={{ color: 'red' }}>Something went Wrong! Try Again </span>}
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}