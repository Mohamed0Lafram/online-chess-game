import { useState } from 'react';


export default function Pieace({info , setTurn}) {

    
    return (
        <div    className="Pieace" 
                style={{
                    gridArea : `${info.position[1]} / ${info.position[0]}/${info.position[1]}/${info.position[0]}`,
                    borderRadius : '50%',
                    background : 'blue'
                }}
                onClick={() => setTurn(info.name)}
                >
        </div>
    )
}