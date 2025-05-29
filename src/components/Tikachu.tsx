import { forwardRef, useEffect, useState } from "react";
import styles from "../styles/tikachu.module.css";

interface PikachuProps {
  isJumping: boolean;
  yPosition: number;
  isRunning?: boolean;
}

const Tikachu = forwardRef<HTMLDivElement, PikachuProps>(
  ({ isJumping, yPosition, isRunning = true }, ref) => {
    const [actor, setActor] = useState<string>("run_1");

    useEffect(() => {
      if (isJumping || !isRunning) return;

      const interval = setInterval(() => {
        setActor((prev) => {
          if (prev === "run_1") return "run_2";
          return "run_1";
        });
      }, 200);

      return () => clearInterval(interval);
    }, [isJumping, isRunning]);

    return (
      <div
        ref={ref}
        className={`${styles.pikachu}`}
        style={{ bottom: `${30 - yPosition}px` }}
      >
        {isJumping ? (
          <img
            src="/actors/Jump.png"
            alt="tikachu Jumping"
            className={styles.image}
            draggable="false"
          />
        ) : !isRunning ? (
          <img
            src="/actors/Static.png"
            alt="tikachu Static"
            className={styles.image}
            draggable="false"
          />
        ) : (
          <img
            src={"/actors/" + actor + ".png"}
            alt="Pikachu"
            className={styles.image}
            draggable="false"
          />
        )}
      </div>
    );
  }
);

Tikachu.displayName = "Tikachu";

export default Tikachu;
