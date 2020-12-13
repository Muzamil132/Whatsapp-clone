import React,{useState,useEffect} from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import SearchIcon from '@material-ui/icons/Search';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';
import {useParams} from 'react-router-dom'
import {useContext} from 'react'
import {StateContext} from './StateProvider'
import firebase from 'firebase'
import './App.css'
import db from './firebase';
const Chat = () => {
  
    const [input,setInput] =useState('')
    const [roomname,setroomname]=useState('')
    const [message,setmessage]=useState([])
    const {user}=useContext(StateContext)
       const {roomId} =useParams()

       useEffect(()=>{
           if(roomId){
               db.collection('room').doc(roomId).onSnapshot(room=>setroomname(room.data().name))

               db.collection('room').doc(roomId).collection('messages')
                                                 .orderBy('timestamp','asc')
                                                 .onSnapshot(snapshot=>(

                                                 setmessage(snapshot.docs.map(doc=>doc.data()))


                                                 ))
           }

       },[roomId])

    const submit =(e)=>{
        e.preventDefault()
        console.log(input)

        db.collection('room').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('')
    }
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_info">
                    <h3>{roomname}</h3>
                    <p>
                        Last seen
                  </p>
                </div>
                <div className="header_right">
                    <IconButton>
                        <SearchIcon />

                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />

                    </IconButton>
                    <IconButton>

                        <SettingsIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
            {
                message.map(message=>(
                 
                  <div className={`msg ${message.name==user.displayName && "reciever"}`}>
                    <strong className="avatar">
                        {message.name}
                     </strong>
                    <p>{message.message}     <span className="time-stamp">
                    {
                        new Date(message.timestamp?.toDate()).toUTCString()
                    }
                    
                     </span></p>

                </div>
                
       

                ))
            }
            </div>
            <div className="chat_footer">
                <IconButton>
                    <EmojiEmotionsIcon />

                </IconButton>


                   <form onSubmit={submit}>
                    <input
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                     className="input" placeholder="enter msg here " type="text" />
                 

                       <button
                       onClick={submit}
                        type="button" className="btn">
                       Send
                       </button>
                   
                </form>
                <IconButton>

                    <MicIcon />
                </IconButton>

            </div>
        </div>
    )
}

export default Chat

