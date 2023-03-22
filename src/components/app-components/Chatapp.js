import React from 'react'
import { Sidebar } from './Sidebar'
import { Chat } from './Chat'


export const Chatapp = () => {
  
    return (
        <>
            <div className='pageContainer'>
                <div className='chat-app-container'>
                    <Sidebar />
                    <Chat />
                </div>
            </div>


        </>
    )
}
