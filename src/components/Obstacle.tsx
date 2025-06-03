import React from "react";
import styles from "../styles/Obstacle.module.css";

interface ObstacleProps {
  left: number;
  type: "pokeball" | "rocket" | "aswin";
  id: number;
}

const Obstacle: React.FC<ObstacleProps> = ({ left, type, id }) => {
  const obstacleEmoji = type === "pokeball" ? "🔴" : "🚀";

  return (
    <div
      id={`obstacle-${id}`}
      className={`${styles.obstacle} ${styles[type]}`}
      style={{ left: `${left}px` }}
    >
      {type === "aswin" ? (
        <img src="/obstacles/aswin.png" alt="abc" loading="lazy" className={styles.aswin} />
      ) : type === "pokeball" ? (
        <img src="/obstacles/pokeball.svg" alt="Pokeball" loading="lazy" />
      ) : (
        obstacleEmoji
      )}
    </div>
  );
};

export default Obstacle;
