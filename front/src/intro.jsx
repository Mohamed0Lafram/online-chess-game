import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "./socket";


export default function Intro({setMyColor,setRoomName}) {
    const navigate = useNavigate();
    useEffect(() =>{
        socket.on('color of my pieaces',(data) =>{
            console.log(`the color for this player is ${data.my_color}`);
            setMyColor(data.my_color);
            setRoomName(data.room_name);
        })

    },[])
    const start_game = () =>{
        socket.emit('enter game')
    }
    return(
        <button 
            onClick={()=>{
                start_game();
                navigate('/board');

        }}>Start Game</button>
    )

}