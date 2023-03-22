import React from 'react'
import { useState } from 'react'
import Loginmodal from './Login/Loginmodal'
import { signOut } from 'firebase/auth'
import { auth } from './Firebase'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import UserContext from './context/UserContext'



export const Navbar = () => {
    const currUser = useContext(UserContext)

    const [loginModalState, setLoginModalState] = useState(false)
    const [loggedIn, setLoggedIn] = useState(currUser.currentUser ? false : true)
    const navigate = useNavigate();
    return (
        <>
            <div className='navbarContainer'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light navbar">
                    <a className="navbar-brand" href="/" style={{ color: '#0080ff' }}>QuickConnect</a>
                    <div className="form-inline my-2 my-lg-0 ms-auto">

                        {
                            loggedIn ? <button className="btn btn-outline-success my-2 my-sm-0 ms-auto" type="submit" onClick={() => {
                                signOut(auth)
                                setLoggedIn(false)
                                navigate('/')
                            }}>
                                Log Out</button>
                                : <button className="btn btn-outline-success my-2 my-sm-0 ms-auto" type="submit" onClick={() => setLoginModalState(!loginModalState)}>
                                    Log in</button>
                        }
                    </div>
                </nav>
                {loginModalState && < Loginmodal
                    loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                    setLoginModalState={setLoginModalState} />}
            </div>

        </>
    )
}
