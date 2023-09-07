// Alternative Pomodoro.tsx
import React, { useState, useEffect } from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faS, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import 'reactjs-popup/dist/index.css';
import { Popup } from 'reactjs-popup';
import { log } from 'console';







function Pomodoro ()  {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isStop,setStop]=useState(false);
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
          
            setStop(true);
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

   function  handleClose() {
    console.log("inside the handleclose");
  
    setStop(!isStop);
    
  }

  const logo = require('./image.jpg');

  return (
    <div className='pomorodo'>
      <h1> Pomodoro  </h1>
      <h2>{isActive?'Back to Focus' :'Take Rest'}</h2>
    <div className="container">
     
      <div className='clock'> 
      <svg viewBox="0 0 220 220">
          <circle
            shape-rendering="geometricPrecision"
            cx="110"
            cy="110"
            r="96"
          />
          <circle
            shape-rendering="geometricPrecision"
            className="indicator"
            cx="110"
            cy="110"
            r="96"
          />
        </svg>

      
      <div className='value-container'>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      </div>
      <div className="buttons-container">
        <i className={isActive ? 'fa fa-pause' : 'fa fa-play'} onClick={toggleTimer}></i>
        <i className="fa fa-repeat"  onClick={resetTimer}> </i>
       

</div>

    </div>
    <Popup  open={isStop?true:false} modal nested >
    <i className="fa fa-close close-btn" onClick={handleClose} ></i>
  
      
 <div className="modal">
 <img className='logo' src={logo} alt="" />
 
  <h2>Milestone Completed</h2>
  
  </div>
    </Popup>
    </div>

  );
};

export default Pomodoro;
