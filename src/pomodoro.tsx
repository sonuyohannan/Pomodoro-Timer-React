// Alternative Pomodoro.tsx
import React, { useState, useEffect } from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faS, faAlignRight } from '@fortawesome/free-solid-svg-icons';
// library.add(faS, faAlignRight)
import './App.css';






function Pomodoro ()  {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

  useEffect(() => {
    let id: number | undefined;

    if (isActive) {
      id = window.setInterval(() => {
        console.log("inside the setInterval",id);
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(id);
            // Timer is up!
            alert('Time is up!');
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);

    //   setIntervalId(id);
    } else if (intervalId !== undefined) {
      clearInterval(intervalId);
    }

    // Cleanup on unmount
    return () => {
      if (id !== undefined) {
        clearInterval(id);
      }
    };
  }, [isActive, minutes, seconds, intervalId]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="pomodoro">
      <h1>Pomodoro Timer</h1>
      <div className='value-container'>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="buttons-container">
        <i className={isActive ? 'fa fa-pause' : 'fa fa-play'} onClick={toggleTimer}></i>
        <i className="fa fa-repeat"  onClick={resetTimer}> </i>
       

</div>
    </div>
  );
};

export default Pomodoro;
