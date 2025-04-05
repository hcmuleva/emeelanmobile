import React from 'react'
import { NoticeBar } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';

const ScrollingTextBanner = () => {
  const messages = [
    "Emeelan is available for all devices",
    "Now you can connect, make a request and get response",
    "New feature update coming next week",
    "System maintenance scheduled for tomorrow"
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % messages.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <NoticeBar
      content={messages[currentIndex]}
      color="alert"
      icon={<RightOutline />}
      wrap
      style={{
        '--background-color': '#fffbe6',
        '--border-color': '#ffe58f',
        '--text-color': '#333',
        margin: '12px 0'
      }}
    />
  );
};

export default ScrollingTextBanner
