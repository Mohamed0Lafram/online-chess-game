import check_road from "./check_road";

export default function moving_rules(Squares,color, name, initial_position, move_number) {
    //pawns 
    if (name === 'pawn') {
        let allowed_positions = []
        if (move_number === 0) {
            let operation = (color === 'white') ? [-2,-1] : [2,1];
            //check tis there a possible pieace in this possile position
            if(typeof Squares[initial_position[0] + operation[0]][initial_position[1]] !== 'object' && 
                typeof Squares[initial_position[0] + operation[1] ][initial_position[1]] !== 'object'
            ){
                allowed_positions.push([initial_position[0] + operation[0], initial_position[1]]);
            }
            
        }
        let operation = (color === 'white') ? -1 : 1;
        
        //check tis there a possible pieace in this possile position
        if(typeof Squares[initial_position[0] + operation][initial_position[1]] !== 'object'){
            allowed_positions.push([initial_position[0] + operation, initial_position[1]]);
        }
        //check if the position is possible
        if( (initial_position[1] + 1) <  8 ){//check if the position is possible
            let possible_square = Squares[initial_position[0] + operation][initial_position[1]+1]
            if(typeof possible_square === 'object' && possible_square.color !== Squares[initial_position[0]][initial_position[1]].color){
                allowed_positions.push([initial_position[0] + operation, initial_position[1] + 1]);
            }
            
        }
        if((initial_position[1] - 1) >= 0){//check if the position is possible
            let possible_square = Squares[initial_position[0] + operation][initial_position[1] - 1]
            if(typeof possible_square === 'object' && possible_square.color !== Squares[initial_position[0]][initial_position[1]].color){
                allowed_positions.push([initial_position[0] + operation, initial_position[1] - 1]);
            }
        }  
        //note : if the pieace is on the side the list duplicate one position
        console.log('TEST :allowed positions for the pawn',allowed_positions)
        return allowed_positions;

    }
    //rooks 
    else if (name === 'rook') {
        console.log('TEST : possible position rook  ',coor_ver_hor(initial_position))
        return coor_ver_hor(initial_position);
    }
    //bishops
    else if (name === 'bishop') {
        return coor_diag(initial_position);
    }
    //queens
    else if (name === 'queen') {

        console.log('TEST : possible position queen ',[...coor_diag(initial_position), ...coor_ver_hor(initial_position)])
        return [...coor_diag(initial_position), ...coor_ver_hor(initial_position)];
    }
    //king
    else if (name === 'king') {
        let allowed_positions = []
        if (initial_position[0] + 1 < 8) {
            allowed_positions.push([initial_position[0] + 1, initial_position[1]])
            if (initial_position[1] + 1 < 8) allowed_positions.push([initial_position[0] + 1, initial_position[1] + 1]);
            if (initial_position[1] - 1 >= 0) allowed_positions.push([initial_position[0] + 1, initial_position[1] - 1]);
        }
        if (initial_position[0] - 1 >= 0) {
            allowed_positions.push([initial_position[0] - 1, initial_position[1]])
            if (initial_position[1] + 1 < 8) allowed_positions.push([initial_position[0] - 1, initial_position[1] + 1]);
            if (initial_position[1] - 1 >= 0) allowed_positions.push([initial_position[0] - 1, initial_position[1] - 1]);
        }
        if (initial_position[1] + 1 < 8) allowed_positions.push([initial_position[0], initial_position[1] + 1]);
        if (initial_position[1] - 1 >= 0) allowed_positions.push([initial_position[0], initial_position[1] - 1]);

        //add the castling option (note doble check that the user )
        if(Squares[initial_position[0]][initial_position[1]].move_number === 0 ){
            if(typeof Squares[initial_position[0]][7] === 'object'){//first rook
                //check that the right is empty lane is empty
                
                let is_empty = check_road(Squares, [initial_position,true], 7,initial_position[0])
                console.log('TEST : THE LANE BETWEEN THE KING AND THE ROOK ',is_empty , initial_position)
                if (is_empty && Squares[initial_position[0]][7].move_number === 0) {
                    allowed_positions.push([initial_position[0], initial_position[1] + 2 ]);
                }
            }
            if(typeof Squares[initial_position[0]][0] === 'object'){
                //check id the lane is empty
                let is_empty = check_road(Squares,[initial_position,true], 0,initial_position[0])
                if (is_empty && Squares[initial_position[0]][0].move_number === 0) {
                    allowed_positions.push([initial_position[0], initial_position[1] - 2 ]);
                }
            }
        }

        return allowed_positions
    }
    else if (name === 'knight') {
        let allowed_positions = [];

        if (initial_position[0] + 1 < 8) {
            if (initial_position[1] + 2 < 8) allowed_positions.push([initial_position[0] + 1, initial_position[1] + 2]);
            if (initial_position[1] - 2 >= 0) allowed_positions.push([initial_position[0] + 1, initial_position[1] - 2]);
        }
        if (initial_position[0] - 1 >= 0) {
            if (initial_position[1] + 2 < 8) allowed_positions.push([initial_position[0] - 1, initial_position[1] + 2]);
            if (initial_position[1] - 2 >= 0) allowed_positions.push([initial_position[0] - 1, initial_position[1] - 2]);
        }
        if (initial_position[0] - 2 >= 0) {
            if (initial_position[1] + 1 < 8) allowed_positions.push([initial_position[0] - 2, initial_position[1] + 1]);
            if (initial_position[1] - 1 >= 0) allowed_positions.push([initial_position[0] - 2, initial_position[1] - 1]);
        }
        if (initial_position[0] + 2 < 8) {
            if (initial_position[1] + 1 < 8) allowed_positions.push([initial_position[0] + 2, initial_position[1] + 1]);
            if (initial_position[1] - 1 >= 0) allowed_positions.push([initial_position[0] + 2, initial_position[1] - 1]);
        }

        return allowed_positions;
    }
}

function coor_diag(initial_position) {
    let allowed_positions = [];

    //diagonal up right 
    let i = 1;
    while ((initial_position[0] - i >= 0) && (initial_position[1] + i < 8)) {
        allowed_positions.push([initial_position[0] - i, initial_position[1] + i]);
        i++;
    }
    //diagonal up left 
    i = 1;
    while ((initial_position[0] - i >= 0) && (initial_position[1] - i >= 0)) {
        allowed_positions.push([initial_position[0] - i, initial_position[1] - i]);
        i++;
    }
    //diagonal down right
    i = 1;
    while ((initial_position[0] + i < 8) && (initial_position[1] + i < 8)) {
        allowed_positions.push([initial_position[0] + i, initial_position[1] + i]);
        i++;
    }
    //diagonal down left
    i = 1;
    while ((initial_position[0] + i < 8) && (initial_position[1] - i >= 0)) {
        allowed_positions.push([initial_position[0] + i, initial_position[1] - i]);
        i++;
    }
    return allowed_positions
}

function coor_ver_hor(initial_position) {//checked
    let allowed_positions = [];
    //first horizental 
    for (let i = initial_position[1] + 1; i < 8; i++) {
        allowed_positions.push([initial_position[0], i])
    };
    //other direction horizental 
    for (let i = initial_position[1] - 1; i >= 0; i--) {
        allowed_positions.push([initial_position[0], i])
    };
    //vertical up
    for (let i = initial_position[0] + 1; i < 8; i++) {
        allowed_positions.push([i, initial_position[1]])
    };
    //vertical down 
    for (let i = initial_position[0] - 1; i >= 0; i--) {
        allowed_positions.push([i, initial_position[1]])

    };

    return allowed_positions;
}

