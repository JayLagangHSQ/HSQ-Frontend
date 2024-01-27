import { useState, useEffect } from 'react';

const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Format the time to HH:mm:ss
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div>
      <p className='small'>{formattedTime}</p>
    </div>
  );
};

export default RealTimeClock;
