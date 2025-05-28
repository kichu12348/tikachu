import React from 'react';
import styles from '../styles/Screen.module.css';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>Game Over!</h1>
      <p className={styles.score}>Final Score: {Math.floor(score / 10)}</p>
      <p className={styles.instruction}>Press SPACE to restart</p>
      <button className={styles.button} onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;
