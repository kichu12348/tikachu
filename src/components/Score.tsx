import React from 'react';
import styles from '../styles/Score.module.css';

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div className={styles.score}>
      Score: {Math.floor(score / 10)}
    </div>
  );
};

export default Score;
