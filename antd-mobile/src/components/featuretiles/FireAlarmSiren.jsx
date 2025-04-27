import React from 'react';
import { Card, Button } from 'antd-mobile';
import useSound from 'use-sound';

const sirenUrl =  '/school-fire-alarm-loud.mp3'; // or import siren from './siren.mp3'

const FireAlarmSiren = () => {
  const [play, { stop, isPlaying }] = useSound(sirenUrl, { interrupt: true });

  return (
    <Card
      title="Fire Alarm Siren"
      style={{ maxWidth: 350, margin: 'auto', marginTop: 24, borderRadius: 12 }}
      bodyStyle={{ textAlign: 'center' }}
    >
      <p>
        Press the button below to play or stop the fire alarm siren.
      </p>
      <Button
        color={isPlaying ? 'danger' : 'primary'}
        size="large"
        onClick={() => {
          if (isPlaying) {
            stop();
          } else {
            play();
          }
        }}
        style={{ width: 180 }}
      >
        {isPlaying ? 'Stop Siren' : 'Play Siren'}
      </Button>
    </Card>
  );
};

export default FireAlarmSiren;
