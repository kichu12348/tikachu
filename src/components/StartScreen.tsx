import React from 'react';
import styles from '../styles/Screen.module.css';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>Tikachu 404</h1>
      <p className={styles.instruction}>Press SPACE or ↑ to start</p>
      <button className={styles.button} onClick={onStart}>
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
