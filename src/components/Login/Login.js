import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase'
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const [userName, setuserName] = useState('');
    const [pass, setPass] = useState('');
    const [error, setErr] = useState(false)
    const [errorMsg, setErrMsg] = useState()
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, userName, pass);
            navigate('/chat')
            props.setLoginModalState(false)
            props.setLoggedIn(true)
        }
        catch (err) {
            handleErrorResponse(err.code)
            props.setLoggedIn(false)
            setErr(true);
        }
    }

    function handleErrorResponse(errorCode) {
        switch (errorCode) {
            case 'auth/user-not-found':
                setErrMsg('User Not Found')
                break;
            case 'auth/wrong-password':
                setErrMsg('Wrong password')
                break;
            default:
                setErrMsg(errorCode)
                break;
        }
    }

    return (
        <div className="auth-form-container">
            <i className="fa-solid fa-xmark closeIcon" onClick={() => props.setLoginModalState(false)}></i>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="Username">Email</label>
                <input onChange={(e) => { setuserName(e.target.value); setErr(false) }} type="email" placeholder="xyz" id="Username" name="Username" />
                <label htmlFor="password">Password</label>
                <input onChange={(e) => { setPass(e.target.value); setErr(false) }} type="password" placeholder="********" id="password" name="password" />
                {
                    props.loggedIn ?
                        <i class="fa-solid fa-circle-check " style={{ color: 'green', alignSelf: 'center', marginTop: '2rem' }}></i>
                        : <button type="submit" className="btn btn-success loginBtn">Log In</button>
                }
                {error && <div className='errorMsg'><span style={{ color: 'red' }}>{errorMsg}</span></div>}
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}