import React from 'react'
import homepageImg from '/Users/thewithcer/learningReact/chat-app/chat-app/src/images/homepageImg.jpg'

export const Home = () => {
    return (

        <>
            <div className='homepageContainer'>
                <div className='homepageContent'>
                    <h2 style={{fontSize :'1.5rem'}}>Stay Connected with <span style={{color :'#0080ff' , fontSize :'2.5rem'}}>QuickConnect </span> Your One-Stop Messaging Solution</h2>
                    <div className='homepageImg'>
                        <img src={homepageImg} alt=''></img>
                    </div>
                </div>
            </div>

        </>
    )
}
