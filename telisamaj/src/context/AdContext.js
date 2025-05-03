// import React, { createContext, useContext, useEffect, useState } from 'react';
// import AdPlayer from '../components/common/AdPlayer';

// // Step 1: Create Ad Context
// export const AdContext = createContext();

// export function AdProvider({ children }) {
//   const [showAd, setShowAd] = useState(false);

//   const triggerAd = () => {
//     setShowAd(true);
//   };

//   return (
//     <AdContext.Provider value={{ showAd, setShowAd, triggerAd }}>
//       {children}
//       <AdPlayer />
//     </AdContext.Provider>
//   );
// }

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import AdPlayer from '../components/common/AdPlayer';

// Step 1: Create Ad Context
export const AdContext = createContext();

export function AdProvider({ children }) {
  const [showAd, setShowAd] = useState(false);
  const timerRef = useRef(null);

  const triggerAd = () => {
    console.log('Triggering ad at', new Date().toISOString());
    setShowAd(true);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const scheduleNextTrigger = () => {
      const min = 20 * 60 * 1000; // 20 minutes
      const max = 30 * 60 * 1000; // 30 minutes
      const interval = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log(`Scheduling next ad in ${interval / 1000 / 60} minutes at ${new Date(Date.now() + interval).toISOString()}`);

      timerRef.current = setTimeout(() => {
        if (!showAd) {
          triggerAd();
        } else {
          console.log('Ad already showing, retrying in 1 minute');
          timerRef.current = setTimeout(scheduleNextTrigger, 60000); // Retry in 1 minute
        }
        scheduleNextTrigger();
      }, interval);
    };

    const initialDelay = Math.floor(Math.random() * 10000) + 2000; // 2-12 seconds
    console.log(`Initial ad trigger scheduled in ${initialDelay / 1000} seconds`);
    timerRef.current = setTimeout(() => {
      triggerAd();
      scheduleNextTrigger();
    }, initialDelay);

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        console.log('Cleaning up timer');
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!showAd) {
      console.log('Ad dismissed or not shown, ready for next trigger');
    }
  }, [showAd]);

  return (
    <AdContext.Provider value={{ showAd, setShowAd, triggerAd }}>
      {children}
      <AdPlayer />
    </AdContext.Provider>
  );
}