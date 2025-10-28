import { useEffect, useRef, useState } from "react";

export default function Clock({ color, time, isActive }) {
  const reverse_counter = useRef(time * 60); // initialize once
  const [seconds, setSeconds] = useState(time * 60);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      // start counting down
      intervalRef.current = setInterval(() => {
        reverse_counter.current -= 1;
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            
            return 0;
          }
          console.log('test')
          return prev - 1;
        });
      }, 1000);
    } else {
      // pause
      clearInterval(intervalRef.current);
    }

    // cleanup when unmounting or isActive changes
    return () => clearInterval(intervalRef.current);
  }, [isActive]);



  const minute = Math.floor(seconds/60);
  const Second =  seconds % 60 ;
  return (
    <div
      className="Clock"
      style={{
        border : 'black 3px solid',
        width : '100px',
        height : '40px',
        borderRadius  : '10px',
        background : color,
        color : (color === 'white') ? "black": 'white',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
      }}
    >
      <p>{minute } : {Second}</p>
    </div>
  );
}
