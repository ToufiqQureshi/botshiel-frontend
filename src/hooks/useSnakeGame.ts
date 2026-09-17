import { useState, useCallback, useEffect, useRef } from 'react';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Position = { x: number; y: number };
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameState = 'idle' | 'playing' | 'paused' | 'gameover';

const GRID_SIZE = 20;

const SPEED_MAP: Record<Difficulty, number> = {
  easy: 180,
  medium: 120,
  hard: 70,
};

function getRandomPosition(snake: Position[]): Position {
  let pos: Position;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(seg => seg.x === pos.x && seg.y === pos.y));
  return pos;
}

const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

export function useSnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('snake-high-score');
    return saved ? parseInt(saved, 10) : 0;
  });

  const directionRef = useRef<Direction>('RIGHT');
  const nextDirectionRef = useRef<Direction | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(getRandomPosition(INITIAL_SNAKE));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    nextDirectionRef.current = null;
    setScore(0);
    setGameState('idle');
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    if (gameState === 'gameover' || gameState === 'idle') {
      setSnake(INITIAL_SNAKE);
      setFood(getRandomPosition(INITIAL_SNAKE));
      setDirection('RIGHT');
      directionRef.current = 'RIGHT';
      nextDirectionRef.current = null;
      setScore(0);
    }
    setGameState('playing');
    lastMoveTimeRef.current = performance.now();
  }, [gameState]);

  const pauseGame = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused');
    }
  }, [gameState]);

  const resumeGame = useCallback(() => {
    if (gameState === 'paused') {
      setGameState('playing');
      lastMoveTimeRef.current = performance.now();
    }
  }, [gameState]);

  const togglePause = useCallback(() => {
    if (gameState === 'playing') {
      pauseGame();
    } else if (gameState === 'paused') {
      resumeGame();
    }
  }, [gameState, pauseGame, resumeGame]);

  const changeDirection = useCallback((newDir: Direction) => {
    const current = directionRef.current;
    const opposites: Record<Direction, Direction> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };
    if (newDir !== opposites[current]) {
      nextDirectionRef.current = newDir;
    }
  }, []);

  const changeDifficulty = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    if (gameState !== 'idle') {
      resetGame();
    }
  }, [gameState, resetGame]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const speed = SPEED_MAP[difficulty];

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastMoveTimeRef.current >= speed) {
        lastMoveTimeRef.current = timestamp;

        setSnake(prevSnake => {
          // Apply queued direction
          if (nextDirectionRef.current) {
            directionRef.current = nextDirectionRef.current;
            setDirection(nextDirectionRef.current);
            nextDirectionRef.current = null;
          }

          const dir = directionRef.current;
          const head = prevSnake[0];
          let newHead: Position;

          switch (dir) {
            case 'UP':
              newHead = { x: head.x, y: head.y - 1 };
              break;
            case 'DOWN':
              newHead = { x: head.x, y: head.y + 1 };
              break;
            case 'LEFT':
              newHead = { x: head.x - 1, y: head.y };
              break;
            case 'RIGHT':
              newHead = { x: head.x + 1, y: head.y };
              break;
          }

          // Check wall collision
          if (
            newHead.x < 0 ||
            newHead.x >= GRID_SIZE ||
            newHead.y < 0 ||
            newHead.y >= GRID_SIZE
          ) {
            setGameState('gameover');
            return prevSnake;
          }

          // Check self collision
          if (prevSnake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
            setGameState('gameover');
            return prevSnake;
          }

          const newSnake = [newHead, ...prevSnake];

          // Check food collision
          setFood(prevFood => {
            if (newHead.x === prevFood.x && newHead.y === prevFood.y) {
              setScore(prev => {
                const newScore = prev + 10;
                setHighScore(currentHigh => {
                  if (newScore > currentHigh) {
                    localStorage.setItem('snake-high-score', String(newScore));
                    return newScore;
                  }
                  return currentHigh;
                });
                return newScore;
              });
              const newFood = getRandomPosition(newSnake);
              return newFood;
            } else {
              newSnake.pop();
              return prevFood;
            }
          });

          return newSnake;
        });
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, difficulty]);

  // Update high score on game over
  useEffect(() => {
    if (gameState === 'gameover') {
      setHighScore(currentHigh => {
        if (score > currentHigh) {
          localStorage.setItem('snake-high-score', String(score));
          return score;
        }
        return currentHigh;
      });
    }
  }, [gameState, score]);

  return {
    snake,
    food,
    direction,
    gameState,
    score,
    difficulty,
    highScore,
    gridSize: GRID_SIZE,
    startGame,
    resetGame,
    pauseGame,
    resumeGame,
    togglePause,
    changeDirection,
    changeDifficulty,
  };
}
