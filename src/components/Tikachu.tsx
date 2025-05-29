import { forwardRef,useEffect,useState} from "react";
import styles from "../styles/tikachu.module.css";

interface PikachuProps {
  isJumping: boolean;
  yPosition: number;
}

const Tikachu = forwardRef<HTMLDivElement, PikachuProps>(
  ({ isJumping, yPosition }, ref) => {

    const [actor,setActor] = useState<string>("run_1");

    useEffect(()=>{
      // Only animate when not jumping to prevent animation conflicts
      if (isJumping) return;
      
      const interval = setInterval(() => {
        setActor((prev) => {
          if (prev === "run_1") return "run_2";
          return "run_1";
        });
      }, 200);

      return () => clearInterval(interval);
    },[isJumping]);

    return (
      <div
        ref={ref}
        className={`${styles.pikachu}`}
        style={{ bottom: `${20 - yPosition}px` }}
      >
        {isJumping ? (
          <img
            src="/actors/Jump.png"
            alt="tikachu Jumping"
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
