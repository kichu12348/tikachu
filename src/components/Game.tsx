import React, { useState, useEffect, useRef, useCallback } from "react";
import Tikachu from "./Tikachu";
import Obstacle from "./Obstacle";
import Score from "./Score";
import StartScreen from "./StartScreen";
import GameOverScreen from "./GameOverScreen";
import styles from "../styles/Game.module.css";

interface ObstacleData {
  id: number;
  left: number;
  type: "pokeball" | "rocket";
}

//contants
const INITIAL_GAME_SPEED = 5;
const SPEED_INCREASE_FACTOR = 0.0005;
const MAX_GAME_SPEED = 15;
const OBSTACLE_SPAWN_RATE = 2000;
const JUMP_FORCE = -15;
const GRAVITY = 0.8;
const GROUND_Y = 0;

type GameState = "start" | "running" | "gameOver";

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [obstacles, setObstacles] = useState<ObstacleData[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [pikachuY, setPikachuY] = useState<number>(0);
  const [pikachuVelocity, setPikachuVelocity] = useState<number>(0);
  const [gameSpeed, setGameSpeed] = useState<number>(5);
  const gameLoopRef = useRef<number>();
  const lastObstacleTimeRef = useRef<number>(0);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const pikachuRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setGameState("running");
    setScore(0);
    setObstacles([]);
    setIsJumping(false);
    setPikachuY(GROUND_Y);
    setPikachuVelocity(0);
    setGameSpeed(INITIAL_GAME_SPEED);
    lastObstacleTimeRef.current = Date.now();
  };

  const endGame = () => {
    setGameState("gameOver");
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  };

  const jump = useCallback(() => {
    if (
      gameState === "running" &&
      Math.abs(pikachuY - GROUND_Y) < 0.1 &&
      Math.abs(pikachuVelocity) < 0.1
    ) {
      setIsJumping(true);
      setPikachuVelocity(JUMP_FORCE);
    }
  }, [gameState, pikachuY, pikachuVelocity]);

  const checkCollision = useCallback(() => {
    if (!pikachuRef.current) return false;

    const pikachuRect = pikachuRef.current.getBoundingClientRect();

    return obstacles.some((obstacle) => {
      const obstacleElement = document.getElementById(
        `obstacle-${obstacle.id}`
      );
      if (!obstacleElement) return false;

      const obstacleRect = obstacleElement.getBoundingClientRect();

      return (
        pikachuRect.left < obstacleRect.right &&
        pikachuRect.right > obstacleRect.left &&
        pikachuRect.top < obstacleRect.bottom &&
        pikachuRect.bottom > obstacleRect.top
      );
    });
  }, [obstacles]);

  const updatePhysics = useCallback(() => {
    if (gameState !== "running") return;

    const newVelocity = pikachuVelocity + GRAVITY;
    setPikachuVelocity(newVelocity);

    setPikachuY((prev) => {
      const newY = prev + newVelocity;
      if (newY >= GROUND_Y - 0.1) {
        if (newVelocity >= 0) {
          setIsJumping(false);
          setPikachuVelocity(0);
        }
        return GROUND_Y;
      }

      return newY;
    });
  }, [gameState, pikachuVelocity]);

  const gameLoop = useCallback(() => {
    if (gameState !== "running") return;
    const currentTime = Date.now();

    updatePhysics();

    setGameSpeed((prev) =>
      Math.min(prev + SPEED_INCREASE_FACTOR, MAX_GAME_SPEED)
    );

    if (currentTime - lastObstacleTimeRef.current > OBSTACLE_SPAWN_RATE) {
      const obstacleType = ["pokeball", "rocket", "tree"][
        Math.floor(Math.random() * 2)
      ] as "pokeball" | "rocket";
      const newObstacle: ObstacleData = {
        id: currentTime,
        left: 800,
        type: obstacleType,
      };
      setObstacles((prev) => [...prev, newObstacle]);
      lastObstacleTimeRef.current = currentTime;
    }

    setObstacles((prev) =>
      prev
        .map((obstacle) => ({ ...obstacle, left: obstacle.left - gameSpeed }))
        .filter((obstacle) => obstacle.left > -100)
    );

    setScore((prev) => prev + 1);

    if (checkCollision()) {
      endGame();
      return;
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, checkCollision, updatePhysics, gameSpeed]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        if (gameState === "start") {
          startGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("touchstart", jump);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("touchstart", jump);
    };
  }, [gameState, jump]);

  useEffect(() => {
    if (gameState === "running") {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);

  return (
    <div className={styles.gameContainer} ref={gameContainerRef}>
      {gameState === "start" && <StartScreen onStart={startGame} />}
      {gameState === "gameOver" && (
        <GameOverScreen score={score} onRestart={startGame} />
      )}

      <>
        <Score score={score} />
        <div className={styles.gameArea}>
          <Tikachu
            ref={pikachuRef}
            isJumping={isJumping}
            yPosition={pikachuY}
            isRunning={gameState === "running"}
          />
          {obstacles.map((obstacle) => (
            <Obstacle
              key={obstacle.id}
              id={obstacle.id}
              left={obstacle.left}
              type={obstacle.type}
            />
          ))}
        </div>
        <div className={styles.ground}></div>
      </>
    </div>
  );
};

export default Game;
