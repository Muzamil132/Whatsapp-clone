import React ,{useState,useEffect} from 'react'
import './App.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';

import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import SearchIcon from '@material-ui/icons/Search';
import {Avatar,IconButton }from '@material-ui/core';
import Sidebarchat from './Sidebarchat';
import db from './firebase';
import {useContext }from 'react'
import {StateContext} from './StateProvider'
const Sidebar = () => {
const {user} =useContext(StateContext)
    const [room,setroom]=useState([])

    useEffect(()=>{
      const unsub   = db.collection('room').onSnapshot((snapshot)=>{


         setroom(snapshot.docs.map(doc=>(
                {
                    id:doc.id,
                    data:doc.data()
                }
            )))
        

        })
        return ()=>unsub
        console.log(room)
    },[])
    return (
        <div className="sidebar">
        <div className="sidebar_header">
         <Avatar src={user?.photoURL}/>
         <div className="header_right">
         <IconButton>
         <DonutLargeIcon/>
         </IconButton>
         <IconButton>
         <ChatBubbleIcon/>
         </IconButton>
         <IconButton>
         <MoreVertIcon/>
         </IconButton>
       
      
      
        
     </div>
        </div>
        <div className="search">
        <div  className="sidebar_search">
        <SearchIcon/>
        <input  placeholder="search here" type="text"/>
        </div>
        
        </div>
        <div className="sidebar_chat">
        <Sidebarchat Addchat="Addchat"/>
       {
        room.map((room)=>{
            return <Sidebarchat
            
            key={room.id}
             id={room.id}
             room={room.data.name}/>
        })
       }
        </div>
            
        </div>
    )
}

export default Sidebar
