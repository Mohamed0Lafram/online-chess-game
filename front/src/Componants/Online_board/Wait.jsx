import { useEffect } from "react";
import socket from "../../socket";
import { useNavigate } from "react-router-dom";


export default function Wait(){
    const navigate = useNavigate();


    useEffect(() =>{
        socket.on('start the game', (data) =>{
            
        })
    },[])



}