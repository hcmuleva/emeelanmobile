import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useAd } from '../../hooks/useAd';

export default function AdPlayer() {
  const { showAd, setShowAd } = useAd();
  const [shouldShowAd, setShouldShowAd] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdownDone, setCountdownDone] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);

  // Sample ads (replace with your own ad content)
  const ads = [
    {
      title: '🔥 Limited Offer Ad 🔥',
      description: 'Stay tuned for exclusive deals!',
      image: 'https://via.placeholder.com/280x140?text=Ad+1'
    },
    {
      title: '🎉 New Product Launch 🎉',
      description: 'Discover our latest innovation!',
      image: 'https://via.placeholder.com/280x140?text=Ad+2'
    },
    {
      title: '💎 Subscribe & Save 💎',
      description: 'Get 20% off your first order!',
      image: 'https://via.placeholder.com/280x140?text=Ad+3'
    }
  ];

  // Random ad trigger logic
  useEffect(() => {
    if (!showAd) return;

    const chance = Math.random();
    const delay = Math.floor(Math.random() * 10000) + 2000; // Random delay between 2-12 seconds

    if (chance < 0.3) { // 30% chance to show ad
      const timer = setTimeout(() => {
        const randomAd = ads[Math.floor(Math.random() * ads.length)];
        setCurrentAd(randomAd);
        setShouldShowAd(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowAd(false); // Reset if ad doesn't show
    }
  }, [showAd, setShowAd]);

  // Linear progress bar logic
  useEffect(() => {
    if (!shouldShowAd || countdownDone) return;

    const duration = 10; // seconds
    const interval = 100; // ms
    const steps = (duration * 1000) / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setProgress((current / steps) * 100);
      if (current >= steps) {
        clearInterval(timer);
        setCountdownDone(true);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [shouldShowAd, countdownDone]);

  // Handle ad dismissal
  const handleDismiss = () => {
    setShouldShowAd(false);
    setShowAd(false);
    setCountdownDone(false);
    setProgress(0);
  };

  if (!shouldShowAd || !currentAd) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.adBox}>
        {!countdownDone ? (
          <>
            <div style={styles.progressBarWrapper}>
              <div style={{ ...styles.progressBarFill, width: `${progress}%` }} />
            </div>
            <div style={styles.adContent}>
              <img src={currentAd.image} alt="Ad" style={styles.adImage} />
              <h3 style={{ color: 'white' }}>{currentAd.title}</h3>
              <p style={{ color: '#ccc' }}>{currentAd.description}</p>
            </div>
          </>
        ) : (
          <>
            <div style={styles.adContent}>
              <img src={currentAd.image} alt="Ad" style={styles.adImage} />
              <h3 style={{ color: 'white' }}>{currentAd.title}</h3>
              <p style={{ color: '#ccc' }}>{currentAd.description}</p>
            </div>
            <div onClick={handleDismiss} style={styles.dismissButton}>✕</div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  adBox: {
    position: 'relative',
    width: '80%',
    maxWidth: 320,
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 0 20px rgba(255,255,255,0.2)',
    textAlign: 'center'
  },
  progressBarWrapper: {
    position: 'absolute',
    top: 8,
    right: 8,
    height: 6,
    width: '50%',
    backgroundColor: '#333',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F7B801',
    transition: 'width 0.1s linear'
  },
  adContent: {
    marginTop: 20
  },
  adImage: {
    width: '100%',
    height: 'auto',
    borderRadius: 8,
    marginBottom: 16
  },
  dismissButton: {
    fontSize: 28,
    color: '#F7B801',
    fontWeight: 'bold',
    cursor: 'pointer',
    position: 'absolute',
    top: 8,
    right: 16
  }
};