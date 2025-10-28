import { useState } from 'react'
import Board from './Componants/Online_board/Board'
import Intro from './intro'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Winner from './Winner';
import Clock from './Componants/Clock/Clock';
function App() {

  const [My_color,setMyColor] = useState('');
  const [room_name,setRoomName] = useState('');
  /*   
    */
  return (
     <BrowserRouter>
    <Routes>
      <Route path='/' element={<Intro setMyColor={setMyColor} setRoomName={setRoomName}/>}/>
      <Route path='/board' element={<Board My_color={My_color} room_name={room_name}/>}/>
      <Route path='/end_game/:winner' element={<Winner></Winner>}/>
    </Routes>
    </BrowserRouter>
    )
}

export default App
