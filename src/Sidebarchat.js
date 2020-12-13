import React, {useState,useEffect}from 'react'
import {Avatar }from '@material-ui/core';
import db from './firebase';
import {Link} from 'react-router-dom'

const Sidebarchat = ({Addchat,room,id }) => {
        // console.log(props)
    const [seed,setseed] =useState("")
    const [messages,setmessages]=useState([])
      useEffect(()=>{
        setseed(Math.floor(Math.random()*5000))
        db.collection('room').doc(id).collection('messages').orderBy('timestamp','desc')
                                                            .onSnapshot(snap=>setmessages(
                                                              snap.docs.map(doc=>(doc.data()))
                                                            ))
      },[])

      const addchat =()=>{
          const Newchat = prompt('ADD NEW CHAT')
          if(Newchat){
              db.collection('room').add({
                  name:Newchat
              })
          }
      }


    return  !Addchat?(
        <Link to={`/room/${id}`}>
        <div className="chatlist">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
          <div>
          <h3>{room}</h3>
          <p>{messages[0]?.message}</p> 
          </div>
        </div>
        </Link>
    ):(
        <div  onClick={addchat} className="chatlist">
        <h2>Addchat</h2>
        </div>
    )
    
}

export default Sidebarchat
