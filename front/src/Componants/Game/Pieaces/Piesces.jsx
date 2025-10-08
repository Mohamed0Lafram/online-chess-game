import { useEffect, useState } from 'react';
import './Pieaces.css'
import Pieace from '../Pieace/Pieace';


export default function Pieaces() {
    const [white_position,setWhite_position] = useState(
        [
            {
                name : 'pawn_1',
                position: [1,1]
            },
            {
                name : 'pawn',
                position: [1,2] 
            }
        ]);
    const [pieace_turn,setPieaceTurn] = useState(null);
    const [clicked_position,setClickedPosition] = useState([]);

    return (
        <div className="Pieaces">

            
        </div>
    )
}