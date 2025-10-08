import { useEffect, useState } from 'react';
import './Board.css'
//images 
//white
import pawn_w from '../../assets/pieaces_images/pawn_w.png';
import bishop_w from '../../assets/pieaces_images/bishop_w.png';
import knight_w from '../../assets/pieaces_images/knight_w.png';
import rook_w from '../../assets/pieaces_images/rook_w.png';
import queen_w from '../../assets/pieaces_images/queen_w.png';
import king_w from '../../assets/pieaces_images/king_w.png';
//black
import pawn_b from '../../assets/pieaces_images/pawn_b.png';
import bishop_b from '../../assets/pieaces_images/bishop_b.png';
import knight_b from '../../assets/pieaces_images/knight_b.png';
import rook_b from '../../assets/pieaces_images/rook_b.png';
import queen_b from '../../assets/pieaces_images/queen_b.png';
import king_b from '../../assets/pieaces_images/king_b.png';









export default function Board() {
    //game pieaces 
    const [Pieaces, setPieaces] = useState([
        {
            color: 'white',
            pieaces: [
                {
                    name: 'pawn_w',
                    image: pawn_w,
                    position: [
                        [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8]
                    ]
                },
                {
                    name: 'bishop_w',
                    image: bishop_w,
                    position: [
                        [8, 3], [8, 6]
                    ]
                },
                {
                    name: 'knight_w',
                    image: knight_w,
                    position: [
                        [8, 2], [8, 7]
                    ]
                },
                {
                    name: 'rook_w',
                    image: rook_w,
                    position: [
                        [8, 1], [8, 8]
                    ]
                },
                {
                    name: 'queen_w',
                    image: queen_w,
                    position: [
                        [8, 5]
                    ]
                },
                {
                    name: 'king_w',
                    image: king_w,
                    position: [
                        [8, 4]
                    ]
                },

            ]
        },
        {
            color: 'black',
            pieaces: [
                {
                    name: 'pawn_b',
                    image: pawn_b,
                    position: [
                        [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8]
                    ]
                },
                {
                    name: 'bishop_b',
                    image: bishop_b,
                    position: [
                        [1, 3], [1, 6]
                    ]
                },
                {
                    name: 'knight_b',
                    image: knight_b,
                    position: [
                        [1, 2], [1, 7]
                    ]
                },
                {
                    name: 'rook_b',
                    image: rook_b,
                    position: [
                        [1, 1], [1, 8]
                    ]
                },
                {
                    name: 'queen_b',
                    image: queen_b,
                    position: [
                        [1, 5]
                    ]
                },
                {
                    name: 'king_b',
                    image: king_b,
                    position: [
                        [1, 4]
                    ]
                },

            ]
        }
    ]);

    //represente each square on the board 
    const [Squares, setSquares] = useState(Array(8).fill(Array(8).fill(0)));



    useEffect(() => {
        //set each pieace at its initial position
        let copy = Squares.map(items => [...items]);

        //set  pieaces 
        for (let i = 0; i < Pieaces.length; i++) {//pieace color
            for (let j = 0; j < Pieaces[i].pieaces.length; j++) {//classe pieace
                for (let k = 0; k < Pieaces[i].pieaces[j].position.length; k++) { // single pieace
                    copy[Pieaces[i].pieaces[j].position[k][0] - 1][Pieaces[i].pieaces[j].position[k][1] - 1] = {
                        name: Pieaces[i].pieaces[j].name,
                        urlimage: Pieaces[i].pieaces[j].image,
                        position: Pieaces[i].pieaces[j].position[k]
                    }

                }
            }
        }

        //add pieace to square 
        setSquares(() => {
            return copy.map((rows) => {
                return rows.map((cols) => {
                    return (typeof cols === 'object') ?
                        { ...cols } :
                        cols
                })
            })
        })
        console.log(copy);
    }, [])


    //create a play sysytem where users only have access to their pieaces 
    //the turn start with white after he click two times
    //the turn goes to black and then it goes again to white etc
    const [turn,setTurn] = useState(true);
    //test
    useEffect(() =>{console.log( (turn) ? 'the white turn' : 'the black turn')},[turn])

    //variables 
    const [first_click, setFirstClick] = useState([[],turn]);//this varibel will contain the position of the block clicked
    
    //this function movesa piesce from a to b
    const move_pieace = (y, x) => {
        if (first_click[0].length === 0) {
            if (typeof Squares[y][x] === 'object') {
                console.log('first click!!!!!')
                setFirstClick([[y, x],turn]) //assing this div as the first click div
            }
        }
        else {//this div is the second one clicked
            //copy the square array
            let copy = Squares.map((rows) => {
                return rows.map((cols) => {
                    return (typeof cols === 'object') ?
                        { ...cols } :
                        cols
                })
            })
            //replace the object in the first click to this div
            copy[y][x] = copy[first_click[0]][first_click[1]];
            copy[first_click[0]][first_click[1]] = 0;

            //give the turn to the other player
            setTurn(!turn);
            setFirstClick([[],turn]);
            //add pieace to square 
            setSquares(() => {
                return copy.map((rows) => {
                    return rows.map((cols) => {
                        return (typeof cols === 'object') ?
                            { ...cols } :
                            cols
                    })
                })
            })
        }
    }



    ///get the background setup
    const Positions = [];
    const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    for (let i = 0; i < 8; i++) {
        let row = []
        for (let j = 1; j < 9; j++) {
            row.push(cols[i] + j);
        }
        Positions.push(row)
    }





    return (
        <div className="Board">
            {Positions.map((row, index) => {
                let [color_1, color_2] = (index % 2 === 0) ?
                    ['dark', 'light'] :
                    ['light', 'dark'];
                return row.map((position, iindex) => {

                    let color = (iindex % 2 === 0) ?
                        color_1 :
                        color_2;

                    return <div key={position} className={color}
                        style={{
                            gridArea: `${index + 1} / ${iindex + 1} / ${index + 2} / ${iindex + 2}`,
                            backgroundImage: (typeof Squares[index][iindex] === 'object') ?

                                `url(${Squares[index][iindex].urlimage})` :
                                'none',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                        onClick={() => move_pieace(index, iindex)}
                    ></div>

                })
            })}

        </div>
    )
}

