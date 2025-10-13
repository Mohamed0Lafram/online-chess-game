import { useParams } from "react-router-dom"


export default function Winner(){
    const {color} = useParams();

    return (<h1>the {color} player has won </h1>)
}