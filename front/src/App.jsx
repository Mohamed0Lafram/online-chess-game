import { useState } from 'react'
import Board from './Componants/Board/Board'
function App() {


  return (
    <div style={{
      display : 'grid',
      gridTemplateRows : '1fr',
      gridAutoColumns  : '1fr'
    }}>
      <Board></Board>
    </div>
  )
}

export default App
