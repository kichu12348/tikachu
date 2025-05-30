import { forwardRef, useEffect, useState, useRef } from "react";
import styles from "../styles/tikachu.module.css";

interface PikachuProps {
  isJumping: boolean;
  yPosition: number;
  isRunning?: boolean;
  gameSpeed: number;
}

const Tikachu = forwardRef<HTMLDivElement, PikachuProps>(
  ({ isJumping, yPosition, isRunning = true, gameSpeed }, ref) => {
    const [actor, setActor] = useState<string>("run_1");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastFrameTimeRef = useRef<number>(0);

    useEffect(() => {
      if (isJumping || !isRunning) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }

      const animate = () => {
        const now = Date.now();
        const baseInterval = 150;
        const minInterval = 50;
        const animationInterval = Math.max(
          minInterval,
          baseInterval - (gameSpeed - 5) * 10
        );

        if (now - lastFrameTimeRef.current >= animationInterval) {
          setActor((prev) => {
            if (prev === "run_1") return "run_2";
            return "run_1";
          });
          lastFrameTimeRef.current = now;
        }
      };

      if (!intervalRef.current) {
        lastFrameTimeRef.current = Date.now();
        intervalRef.current = setInterval(animate, 16);
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
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
