import React from "react";
import styles from "../styles/Obstacle.module.css";

interface ObstacleProps {
  left: number;
  type: "pokeball" | "rocket" | "tree";
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
      {type === "pokeball" ? (
        <img src="/obstacles/pokeball.svg" alt="Pokeball" />
      ) : (
        obstacleEmoji
      )}
    </div>
  );
};

export default Obstacle;
