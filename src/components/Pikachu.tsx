import { forwardRef } from "react";
import styles from "../styles/Pikachu.module.css";

interface PikachuProps {
  isJumping: boolean;
  yPosition: number;
}

const Pikachu = forwardRef<HTMLDivElement, PikachuProps>(
  ({ isJumping, yPosition }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.pikachu} ${isJumping ? styles.jumping : ""}`}
        style={{ bottom: `${20 - yPosition}px` }}
      >
        <img
          src="/actors/pikachu.svg"
          alt="Pikachu"
          className={styles.image}
          draggable="false"
        />
      </div>
    );
  }
);

Pikachu.displayName = "Pikachu";

export default Pikachu;
