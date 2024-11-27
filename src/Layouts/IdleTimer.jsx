// @ts-nocheck
import React, { memo, useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { format, addMilliseconds, millisecondsToMinutes, millisecondsToSeconds } from "date-fns";

const IdleTimer = () => {

  const [state, setState] = useState('Active')
  const [count, setCount] = useState(0)
  const [remaining, setRemaining] = useState("10:00")

  const onIdle = () => {
    setState('Idle')
  }

  const onActive = () => {
    setState('Active')
  }

  const onAction = () => {
    setCount(count + 1)
  }

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 1000 * 60 * 10, // 10 minits
    throttle: 500
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const idleTimeInMilliseconds = getRemainingTime();

      if (idleTimeInMilliseconds <= 0) {
        setRemaining("00:00");
        clearInterval(interval); // Stop the coutdown when time runs out
        return;
      }

      // Convert milliseconds to Second format
      const convertMillisecondsToTime = (milliseconds) => {
        const date = millisecondsToSeconds(milliseconds);
        return formatTime(date);
      };
      // Convert second yo minits:seconds format 09:59
      const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      };

      setRemaining(convertMillisecondsToTime(idleTimeInMilliseconds));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [getRemainingTime]);

  return (
    <div className='text-white' style={{ fontFamily: 'var(--font-varient)', fontWeight: 800, fontSize: '0.90rem' }} >{remaining}</div>
  )
}

export default memo(IdleTimer)