import { useEffect, useRef, useCallback, useState } from 'react';
import { useSnakeGame, Direction, Difficulty } from './hooks/useSnakeGame';

// Chess.com inspired SVG icons
const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3 2l10 6-10 6V2z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="3" y="2" width="3.5" height="12" rx="0.5" />
    <rect x="9.5" y="2" width="3.5" height="12" rx="0.5" />
  </svg>
);

const RestartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 2a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4V0L12 4 8 8V2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

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
  const [moveHistory, setMoveHistory] = useState<{ num: number; dir: string }[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const prevDirectionRef = useRef<string>('');

  // Track moves for the move list (like chess.com)
  useEffect(() => {
    const dirLabels: Record<string, string> = { UP: '↑', DOWN: '↓', LEFT: '←', RIGHT: '→' };
    const currentDir = snake.length > 1 ? (() => {
      const head = snake[0];
      const neck = snake[1];
      if (head.x > neck.x) return 'RIGHT';
      if (head.x < neck.x) return 'LEFT';
      if (head.y > neck.y) return 'DOWN';
      return 'UP';
    })() : 'RIGHT';

    if (currentDir !== prevDirectionRef.current && gameState === 'playing') {
      prevDirectionRef.current = currentDir;
      setMoveHistory(prev => {
        const newMoves = [...prev, { num: prev.length + 1, dir: dirLabels[currentDir] }];
        return newMoves.slice(-50); // Keep last 50 moves
      });
    }

    if (gameState === 'idle' || gameState === 'gameover') {
      setMoveHistory([]);
      prevDirectionRef.current = '';
    }
  }, [snake, gameState]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
        w: 'UP', W: 'UP',
        s: 'DOWN', S: 'DOWN',
        a: 'LEFT', A: 'LEFT',
        d: 'RIGHT', D: 'RIGHT',
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
        if (gameState === 'idle') startGame();
        else togglePause();
      }

      if (e.key === 'r' || e.key === 'R') {
        resetGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, startGame, togglePause, changeDirection, resetGame]);

  // Touch controls
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

    if (gameState === 'idle' || gameState === 'gameover') startGame();
    changeDirection(dir);
    touchStartRef.current = null;
  }, [gameState, startGame, changeDirection]);

  const handleDPad = useCallback((dir: Direction) => {
    if (gameState === 'idle' || gameState === 'gameover') startGame();
    changeDirection(dir);
  }, [gameState, startGame, changeDirection]);

  const isSnakeCell = (x: number, y: number) => {
    return snake.findIndex(seg => seg.x === x && seg.y === y);
  };

  const isFoodCell = (x: number, y: number) => {
    return food.x === x && food.y === y;
  };

  const getBodyOpacity = (index: number) => {
    if (index === 0) return 1;
    return Math.max(0.5, 1 - (index / snake.length) * 0.5);
  };

  const difficulties: { key: Difficulty; label: string; time: string }[] = [
    { key: 'easy', label: 'Easy', time: 'Slow' },
    { key: 'medium', label: 'Medium', time: 'Normal' },
    { key: 'hard', label: 'Hard', time: 'Fast' },
  ];

  // Coordinate labels
  const colLabels = 'abcdefghijklmnopqrst'.split('').slice(0, gridSize);
  const rowLabels = Array.from({ length: gridSize }, (_, i) => String(gridSize - i));

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#312e2b' }}>
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-4 py-2 border-b" style={{ backgroundColor: '#21201d', borderColor: '#3d3a37' }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">♟</span>
            <span className="text-white font-bold text-lg hidden sm:inline">Snake.com</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded hover:bg-[#3d3a37] transition-colors"
            style={{ color: '#b9b9b9' }}
          >
            <SettingsIcon />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 p-4 max-w-6xl mx-auto w-full">
        
        {/* Left Panel - Game Info (desktop only) */}
        <div className="hidden lg:flex flex-col gap-3 w-56 pt-4">
          <div className="rounded-lg p-4" style={{ backgroundColor: '#262522' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#b9b9b9' }}>GAME INFO</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: '#8b8987' }}>Difficulty</span>
                <span className="text-white capitalize">{difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#8b8987' }}>Grid Size</span>
                <span className="text-white">{gridSize}×{gridSize}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#8b8987' }}>Status</span>
                <span className={`font-medium ${
                  gameState === 'playing' ? 'text-green-400' :
                  gameState === 'paused' ? 'text-yellow-400' :
                  gameState === 'gameover' ? 'text-red-400' : 'text-[#b9b9b9]'
                }`}>
                  {gameState === 'idle' ? 'Ready' :
                   gameState === 'playing' ? 'Playing' :
                   gameState === 'paused' ? 'Paused' : 'Game Over'}
                </span>
              </div>
            </div>
          </div>

          {/* Controls Help */}
          <div className="rounded-lg p-4" style={{ backgroundColor: '#262522' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#b9b9b9' }}>CONTROLS</h3>
            <div className="space-y-1.5 text-xs" style={{ color: '#8b8987' }}>
              <div className="flex justify-between">
                <span>Move</span>
                <span className="text-white">↑↓←→ / WASD</span>
              </div>
              <div className="flex justify-between">
                <span>Pause</span>
                <span className="text-white">Space / Esc</span>
              </div>
              <div className="flex justify-between">
                <span>Restart</span>
                <span className="text-white">R</span>
              </div>
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="rounded-lg p-4" style={{ backgroundColor: '#262522' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#b9b9b9' }}>TIME CONTROL</h3>
            <div className="space-y-1.5">
              {difficulties.map(d => (
                <button
                  key={d.key}
                  onClick={() => changeDifficulty(d.key)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    difficulty === d.key
                      ? 'text-white font-semibold'
                      : 'text-[#b9b9b9] hover:text-white'
                  }`}
                  style={{
                    backgroundColor: difficulty === d.key ? '#81b64c' : 'transparent',
                  }}
                >
                  <span>{d.label}</span>
                  <span className="float-right text-xs opacity-70">{d.time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Board Area */}
        <div className="flex flex-col items-center">
          {/* Opponent / Score Card (top) */}
          <div
            className="w-full flex items-center justify-between px-3 py-2 rounded-t-lg"
            style={{ backgroundColor: '#262522', maxWidth: 'min(85vw, 480px)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded flex items-center justify-center text-lg" style={{ backgroundColor: '#3d3a37' }}>
                🏆
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">High Score</p>
                <p className="text-xs leading-tight" style={{ color: '#8b8987' }}>Best: {highScore}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-white">{highScore}</p>
            </div>
          </div>

          {/* Game Board */}
          <div
            ref={boardRef}
            className="relative"
            style={{
              width: 'min(85vw, 480px)',
              height: 'min(85vw, 480px)',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Row labels (left) */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around -translate-x-5 hidden md:flex">
              {rowLabels.map((label, i) => (
                <span key={i} className="text-xs font-medium" style={{ color: '#8b8987', fontSize: '10px' }}>{label}</span>
              ))}
            </div>

            {/* Column labels (bottom) */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around -translate-y-0 translate-y-4 hidden md:flex">
              {colLabels.map((label, i) => (
                <span key={i} className="text-xs font-medium" style={{ color: '#8b8987', fontSize: '10px' }}>{label}</span>
              ))}
            </div>

            {/* Board Grid */}
            <div
              className="grid w-full h-full rounded-sm overflow-hidden"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
              }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                const x = i % gridSize;
                const y = Math.floor(i / gridSize);
                const isLight = (x + y) % 2 === 0;
                const snakeIdx = isSnakeCell(x, y);
                const isFood = isFoodCell(x, y);
                const isHead = snakeIdx === 0;
                const isBody = snakeIdx > 0;

                let cellContent = null;

                if (isHead) {
                  cellContent = (
                    <div className="w-full h-full snake-head" />
                  );
                } else if (isBody) {
                  cellContent = (
                    <div
                      className="w-full h-full snake-body"
                      style={{ opacity: getBodyOpacity(snakeIdx) }}
                    />
                  );
                } else if (isFood) {
                  cellContent = (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="food w-[75%] h-[75%]" />
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    className={`relative ${isLight ? 'cell-light' : 'cell-dark'}`}
                  >
                    {cellContent}
                  </div>
                );
              })}
            </div>

            {/* Overlay Messages */}
            {gameState === 'idle' && (
              <div className="absolute inset-0 game-overlay flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
                <div className="text-center">
                  <div className="text-4xl mb-3">♟</div>
                  <p className="text-xl font-bold text-white mb-1">New Game</p>
                  <p className="text-sm mb-4" style={{ color: '#b9b9b9' }}>Press Space or click to begin</p>
                  <button
                    onClick={startGame}
                    className="btn-green px-6 py-2.5 text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <PlayIcon /> Play
                  </button>
                </div>
              </div>
            )}

            {gameState === 'paused' && (
              <div className="absolute inset-0 game-overlay flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
                <div className="text-center">
                  <div className="text-3xl mb-3">⏸</div>
                  <p className="text-xl font-bold text-white mb-4">Game Paused</p>
                  <button
                    onClick={togglePause}
                    className="btn-green px-6 py-2.5 text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <PlayIcon /> Resume
                  </button>
                </div>
              </div>
            )}

            {gameState === 'gameover' && (
              <div className="absolute inset-0 game-overlay flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white mb-1">Game Over</p>
                  <p className="text-3xl font-bold mb-1" style={{ color: '#81b64c' }}>{score}</p>
                  <p className="text-sm mb-1" style={{ color: '#b9b9b9' }}>points</p>
                  {score >= highScore && score > 0 && (
                    <p className="text-xs font-semibold mb-3" style={{ color: '#f5d76e' }}>★ New High Score! ★</p>
                  )}
                  <button
                    onClick={startGame}
                    className="btn-green px-6 py-2.5 text-sm font-semibold inline-flex items-center gap-2 mt-2"
                  >
                    <RestartIcon /> New Game
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Player / Current Score Card (bottom) */}
          <div
            className="w-full flex items-center justify-between px-3 py-2 rounded-b-lg"
            style={{ backgroundColor: '#262522', maxWidth: 'min(85vw, 480px)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded flex items-center justify-center text-lg" style={{ backgroundColor: '#3d3a37' }}>
                🐍
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">You</p>
                <p className="text-xs leading-tight" style={{ color: '#8b8987' }}>Length: {snake.length}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-white">{score}</p>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex flex-col items-center gap-3 mt-4 lg:hidden w-full" style={{ maxWidth: 'min(85vw, 480px)' }}>
            {/* Action Buttons */}
            <div className="flex gap-2 w-full">
              {gameState === 'playing' && (
                <button onClick={togglePause} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-sm font-medium text-white" style={{ backgroundColor: '#3d3a37' }}>
                  <PauseIcon /> Pause
                </button>
              )}
              {gameState === 'paused' && (
                <button onClick={togglePause} className="flex-1 btn-green flex items-center justify-center gap-1.5 py-2 rounded text-sm font-semibold">
                  <PlayIcon /> Resume
                </button>
              )}
              {(gameState === 'playing' || gameState === 'paused') && (
                <button onClick={resetGame} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-sm font-medium text-white" style={{ backgroundColor: '#3d3a37' }}>
                  <RestartIcon /> New
                </button>
              )}
            </div>

            {/* D-Pad */}
            <div className="grid grid-cols-3 gap-1.5 w-40">
              <div />
              <button onTouchStart={(e) => { e.preventDefault(); handleDPad('UP'); }} className="dpad-btn p-3 text-lg">▲</button>
              <div />
              <button onTouchStart={(e) => { e.preventDefault(); handleDPad('LEFT'); }} className="dpad-btn p-3 text-lg">◀</button>
              <button onTouchStart={(e) => { e.preventDefault(); togglePause(); }} className="dpad-btn p-3 text-xs font-bold">
                {gameState === 'paused' ? '▶' : '⏸'}
              </button>
              <button onTouchStart={(e) => { e.preventDefault(); handleDPad('RIGHT'); }} className="dpad-btn p-3 text-lg">▶</button>
              <div />
              <button onTouchStart={(e) => { e.preventDefault(); handleDPad('DOWN'); }} className="dpad-btn p-3 text-lg">▼</button>
              <div />
            </div>

            {/* Mobile Difficulty */}
            <div className="flex gap-2 w-full">
              {difficulties.map(d => (
                <button
                  key={d.key}
                  onClick={() => changeDifficulty(d.key)}
                  className={`flex-1 py-2 rounded text-xs font-medium transition-colors ${
                    difficulty === d.key ? 'text-white font-semibold' : 'text-[#b9b9b9]'
                  }`}
                  style={{ backgroundColor: difficulty === d.key ? '#81b64c' : '#3d3a37' }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Move History (desktop) */}
        <div className="hidden lg:flex flex-col gap-3 w-56 pt-4">
          {/* Move List */}
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#262522' }}>
            <div className="px-4 py-2 border-b" style={{ borderColor: '#3d3a37' }}>
              <h3 className="text-sm font-semibold" style={{ color: '#b9b9b9' }}>MOVES</h3>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              {moveHistory.length === 0 ? (
                <p className="text-xs text-center py-4" style={{ color: '#8b8987' }}>No moves yet</p>
              ) : (
                <div className="space-y-0.5">
                  {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, pairIdx) => {
                    const white = moveHistory[pairIdx * 2];
                    const black = moveHistory[pairIdx * 2 + 1];
                    return (
                      <div key={pairIdx} className="flex items-center text-xs move-entry">
                        <span className="w-6 text-right mr-2 font-medium" style={{ color: '#8b8987' }}>{pairIdx + 1}.</span>
                        <span className="w-8 text-center text-white font-mono">{white?.dir || ''}</span>
                        <span className="w-8 text-center font-mono" style={{ color: '#b9b9b9' }}>{black?.dir || ''}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg p-3 space-y-2" style={{ backgroundColor: '#262522' }}>
            {gameState === 'idle' && (
              <button onClick={startGame} className="btn-green w-full py-2 text-sm font-semibold flex items-center justify-center gap-2">
                <PlayIcon /> New Game
              </button>
            )}
            {gameState === 'playing' && (
              <button onClick={togglePause} className="btn-green w-full py-2 text-sm font-semibold flex items-center justify-center gap-2">
                <PauseIcon /> Pause
              </button>
            )}
            {gameState === 'paused' && (
              <>
                <button onClick={togglePause} className="btn-green w-full py-2 text-sm font-semibold flex items-center justify-center gap-2">
                  <PlayIcon /> Resume
                </button>
                <button onClick={resetGame} className="w-full py-2 text-sm font-medium rounded flex items-center justify-center gap-2 text-white" style={{ backgroundColor: '#3d3a37' }}>
                  <RestartIcon /> New Game
                </button>
              </>
            )}
            {gameState === 'gameover' && (
              <button onClick={startGame} className="btn-green w-full py-2 text-sm font-semibold flex items-center justify-center gap-2">
                <RestartIcon /> New Game
              </button>
            )}
          </div>

          {/* Score Summary */}
          <div className="rounded-lg p-4" style={{ backgroundColor: '#262522' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#b9b9b9' }}>SCORE</h3>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold text-white">{score}</p>
                <p className="text-xs" style={{ color: '#8b8987' }}>Current</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold" style={{ color: '#f5d76e' }}>{highScore}</p>
                <p className="text-xs" style={{ color: '#8b8987' }}>Best</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-lg w-full max-w-sm overflow-hidden" style={{ backgroundColor: '#262522' }}>
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#3d3a37' }}>
              <h2 className="text-white font-semibold">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-[#b9b9b9] hover:text-white text-xl">×</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: '#b9b9b9' }}>Difficulty</label>
                <div className="flex gap-2">
                  {difficulties.map(d => (
                    <button
                      key={d.key}
                      onClick={() => changeDifficulty(d.key)}
                      className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
                        difficulty === d.key ? 'text-white' : 'text-[#b9b9b9]'
                      }`}
                      style={{ backgroundColor: difficulty === d.key ? '#81b64c' : '#3d3a37' }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: '#b9b9b9' }}>High Score</label>
                <div className="flex items-center justify-between py-2 px-3 rounded" style={{ backgroundColor: '#3d3a37' }}>
                  <span className="text-white font-bold text-lg">{highScore}</span>
                  <button
                    onClick={() => { localStorage.removeItem('snake-high-score'); window.location.reload(); }}
                    className="text-xs px-2 py-1 rounded"
                    style={{ color: '#ef4444' }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: '#b9b9b9' }}>Controls</label>
                <div className="space-y-1 text-xs" style={{ color: '#8b8987' }}>
                  <p>↑↓←→ or WASD — Move snake</p>
                  <p>Space / Esc — Pause / Resume</p>
                  <p>R — Restart game</p>
                  <p>Swipe — Mobile controls</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-t" style={{ borderColor: '#3d3a37' }}>
              <button onClick={() => setShowSettings(false)} className="btn-green w-full py-2 text-sm font-semibold">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
