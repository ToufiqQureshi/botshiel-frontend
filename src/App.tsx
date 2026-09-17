import { useEffect, useRef, useCallback } from 'react';
import { useSnakeGame, Direction, Difficulty } from './hooks/useSnakeGame';

function App() {
  const {
    snake,
    food,
    gameState,
    score,
    difficulty,
    highScore,
    gridSize,
    startGame,
    resetGame,
    togglePause,
    changeDirection,
    changeDifficulty,
  } = useSnakeGame();

  const boardRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
        w: 'UP',
        W: 'UP',
        s: 'DOWN',
        S: 'DOWN',
        a: 'LEFT',
        A: 'LEFT',
        d: 'RIGHT',
        D: 'RIGHT',
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        if (gameState === 'idle' || gameState === 'gameover') {
          startGame();
        }
        changeDirection(keyMap[e.key]);
      }

      if (e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        if (gameState === 'idle') {
          startGame();
        } else {
          togglePause();
        }
      }

      if (e.key === 'r' || e.key === 'R') {
        resetGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, startGame, togglePause, changeDirection, resetGame]);

  // Touch controls (swipe)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const minSwipe = 30;

    if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return;

    let dir: Direction;
    if (Math.abs(dx) > Math.abs(dy)) {
      dir = dx > 0 ? 'RIGHT' : 'LEFT';
    } else {
      dir = dy > 0 ? 'DOWN' : 'UP';
    }

    if (gameState === 'idle' || gameState === 'gameover') {
      startGame();
    }
    changeDirection(dir);
    touchStartRef.current = null;
  }, [gameState, startGame, changeDirection]);

  // D-pad button handler
  const handleDPad = useCallback((dir: Direction) => {
    if (gameState === 'idle' || gameState === 'gameover') {
      startGame();
    }
    changeDirection(dir);
  }, [gameState, startGame, changeDirection]);

  const getCellClass = (x: number, y: number) => {
    const isHead = snake[0].x === x && snake[0].y === y;
    const isBody = snake.slice(1).some(seg => seg.x === x && seg.y === y);
    const isFood = food.x === x && food.y === y;

    if (isHead) return 'snake-head';
    if (isBody) return 'snake-body';
    if (isFood) return 'food';
    return '';
  };

  const getSnakeBodyIndex = (x: number, y: number) => {
    return snake.findIndex(seg => seg.x === x && seg.y === y);
  };

  const getBodyOpacity = (index: number) => {
    if (index === 0) return 1;
    const opacity = Math.max(0.4, 1 - (index / snake.length) * 0.6);
    return opacity;
  };

  const difficulties: { key: Difficulty; label: string; color: string }[] = [
    { key: 'easy', label: 'Easy', color: 'bg-green-500' },
    { key: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { key: 'hard', label: 'Hard', color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 select-none">
      {/* Header */}
      <div className="w-full max-w-lg mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-2">
          🐍 Snake Game
        </h1>

        {/* Score Display */}
        <div className="flex justify-between items-center bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-slate-700/50">
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Score</p>
            <p className="text-2xl font-bold text-white">{score}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Best</p>
            <p className="text-2xl font-bold text-yellow-400">{highScore}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Length</p>
            <p className="text-2xl font-bold text-emerald-400">{snake.length}</p>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div
        ref={boardRef}
        className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50 shadow-2xl shadow-purple-900/20"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="grid gap-[1px] bg-slate-700/30 rounded-xl overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: 'min(80vw, 400px)',
            height: 'min(80vw, 400px)',
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, i) => {
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);
            const cellClass = getCellClass(x, y);
            const snakeIndex = getSnakeBodyIndex(x, y);
            const isCheckerDark = (x + y) % 2 === 0;

            return (
              <div
                key={i}
                className={`aspect-square transition-all duration-75 ${
                  isCheckerDark ? 'bg-slate-800/50' : 'bg-slate-800/30'
                } ${cellClass}`}
                style={
                  snakeIndex > 0
                    ? { opacity: getBodyOpacity(snakeIndex) }
                    : undefined
                }
              />
            );
          })}
        </div>

        {/* Overlay Messages */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-2xl">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to Play?</p>
            <p className="text-slate-300 text-sm mb-4">Press Space or tap Start</p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform active:scale-95"
            >
              ▶ Start Game
            </button>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-2xl">
            <p className="text-3xl font-bold text-white mb-2">⏸ Paused</p>
            <button
              onClick={togglePause}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform active:scale-95 mt-2"
            >
              ▶ Resume
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-2xl">
            <p className="text-3xl font-bold text-red-400 mb-1">Game Over!</p>
            <p className="text-xl text-white mb-1">Score: {score}</p>
            {score >= highScore && score > 0 && (
              <p className="text-yellow-400 font-bold text-sm mb-2 animate-pulse">🏆 New High Score!</p>
            )}
            <button
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform active:scale-95 mt-2"
            >
              🔄 Play Again
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="w-full max-w-lg mt-4 space-y-3">
        {/* Difficulty Selector */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-slate-400 mr-2">Difficulty:</span>
          {difficulties.map(d => (
            <button
              key={d.key}
              onClick={() => changeDifficulty(d.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                difficulty === d.key
                  ? `${d.color} text-white shadow-lg scale-105`
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          {gameState === 'playing' && (
            <button
              onClick={togglePause}
              className="px-4 py-2 bg-slate-700/60 text-white rounded-xl border border-slate-600/50 hover:bg-slate-600/60 transition-all active:scale-95"
            >
              ⏸ Pause
            </button>
          )}
          {(gameState === 'playing' || gameState === 'paused') && (
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-slate-700/60 text-white rounded-xl border border-slate-600/50 hover:bg-slate-600/60 transition-all active:scale-95"
            >
              🔄 Restart
            </button>
          )}
        </div>

        {/* Mobile D-Pad */}
        <div className="flex justify-center md:hidden">
          <div className="grid grid-cols-3 gap-1 w-36">
            <div />
            <button
              onTouchStart={(e) => { e.preventDefault(); handleDPad('UP'); }}
              className="bg-slate-700/60 text-white rounded-lg p-3 active:bg-slate-600 border border-slate-600/50 flex items-center justify-center"
            >
              ▲
            </button>
            <div />
            <button
              onTouchStart={(e) => { e.preventDefault(); handleDPad('LEFT'); }}
              className="bg-slate-700/60 text-white rounded-lg p-3 active:bg-slate-600 border border-slate-600/50 flex items-center justify-center"
            >
              ◀
            </button>
            <button
              onTouchStart={(e) => { e.preventDefault(); togglePause(); }}
              className="bg-slate-700/60 text-white rounded-lg p-3 active:bg-slate-600 border border-slate-600/50 flex items-center justify-center text-xs"
            >
              {gameState === 'paused' ? '▶' : '⏸'}
            </button>
            <button
              onTouchStart={(e) => { e.preventDefault(); handleDPad('RIGHT'); }}
              className="bg-slate-700/60 text-white rounded-lg p-3 active:bg-slate-600 border border-slate-600/50 flex items-center justify-center"
            >
              ▶
            </button>
            <div />
            <button
              onTouchStart={(e) => { e.preventDefault(); handleDPad('DOWN'); }}
              className="bg-slate-700/60 text-white rounded-lg p-3 active:bg-slate-600 border border-slate-600/50 flex items-center justify-center"
            >
              ▼
            </button>
            <div />
          </div>
        </div>

        {/* Keyboard hints (desktop) */}
        <div className="hidden md:flex justify-center gap-4 text-xs text-slate-500">
          <span>↑↓←→ or WASD: Move</span>
          <span>Space: Pause</span>
          <span>R: Restart</span>
        </div>
      </div>
    </div>
  );
}

export default App;
