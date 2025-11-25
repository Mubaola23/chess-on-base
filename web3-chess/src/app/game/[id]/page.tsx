"use client";

import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useWeb3 } from '@/lib/hooks/useWeb3';
import { ethers } from 'ethers';

const GamePage = ({ params }: { params: { id: string } }) => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const { contract } = useWeb3();
  const [playerOneAddress, setPlayerOneAddress] = useState('');
  const [playerTwoAddress, setPlayerTwoAddress] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (contract) {
      const fetchGame = async () => {
        try {
          const gameId = parseInt(params.id, 10);
          if (isNaN(gameId)) {
            setError('Invalid game ID.');
            return;
          }

          const gamesCount = await contract.getGamesCount();
          if (gameId >= gamesCount) {
            setError('Game not found.');
            return;
          }

          const gameData = await contract.getGame(params.id);
          const [player1, player2, currentTurn, moves] = gameData;
          setPlayerOneAddress(player1);
          setPlayerTwoAddress(player2);
          setCurrentPlayer(currentTurn);

          const newGame = new Chess();
          moves.forEach((move: string) => {
            newGame.move(move);
          });
          setGame(newGame);
          setFen(newGame.fen());
        } catch (e) {
          console.error('Failed to fetch game:', e);
          setError('Failed to load game data.');
        }
      };

      fetchGame();
    }
  }, [contract, params.id]);

  async function onDrop({ sourceSquare, targetSquare }: { sourceSquare: string, targetSquare: string }) {
    if (!contract) return false;

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return false;

    try {
      const tx = await contract.makeMove(params.id, move.san);
      await tx.wait();
      setFen(game.fen());
    } catch (error) {
      console.error("Failed to make move:", error);
      // Revert the move on the local board if the transaction fails
      const newGame = new Chess(fen);
      setGame(newGame);
      return false;
    }

    return true;
  }

  useEffect(() => {
    if (contract) {
      const onMoveMade = (gameId: ethers.BigNumber, player: string, move: string) => {
        if (gameId.toString() === params.id) {
          game.move(move);
          setFen(game.fen());
        }
      };

      contract.on('MoveMade', onMoveMade);

      return () => {
        contract.off('MoveMade', onMoveMade);
      };
    }
  }, [contract, game, params.id]);

  const playerOne = {
    name: "Player One",
    address: playerOneAddress,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbDxrv3UFjPtpQvflG6PD4BOi36oZKSxoNLHqOc0X7NjY4lgOhswaUxp8YlOrAaR7uhD_ctGUITCEIcFh6SZpYMJHn5MJYIE1NOsUL8-kdJtQRO0k2YcPTAbAmS0NbbThM4Nyhxk_74zT0L9zkaEr33xtt5rBS8XkPlUFgEioSzsEjW8GSbWtibJUPHcWAZHz74ikP4vKOmp8PW_OCxdh7m4sK0oNVkARlBxikpTICm6lneGM1aR8t0i4wAHcWXOHl_7tgv6ebSZw",
    captured: "♙♙♘",
  };

  const playerTwo = {
    name: "Player Two",
    address: playerTwoAddress,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4avTti8d-91vqtPFN8eWHN-AeYBktIXXMFCm-tFZU-S8VUgBgipqi0utNyGdMuDQ-20vk4fXg1OrNZYS0nAl40CBsarK4xg2-PIU13_N7SDY6X3tNA2Ibn1tuOg10jLxXCXQHSpXdN8MPjLAIyFQh06KvwkO3LzJuZbQlVGQuHpFDyycNgrQUv3UZXQXza2VDfCswO9q0MseBzKnRRVZd_l-I276glVMKTfH9_GTwac714C8iiLapgaQD-Wunn5LgtCLS4akfC5c",
    captured: "♙♖",
  };

  const moveHistory = game.history({ verbose: true }).map((move, index) => {
    if (index % 2 === 0) {
      return {
        move: index / 2 + 1,
        white: move.san,
        black: game.history({ verbose: true })[index + 1]?.san || '',
      };
    }
    return null;
  }).filter(item => item !== null);

  if (error) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col lg:flex-row gap-8 p-4 sm:p-6 lg:p-8">
      {/* Left Column: Game Area */}
      <div className="flex flex-col flex-1 gap-4">
        {/* Player Two Header */}
        <div className="flex p-4 @container rounded-xl bg-white/5">
          <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
            <div className="flex gap-4 items-center">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-16 w-16"
                style={{ backgroundImage: `url("${playerTwo.avatar}")` }}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">{playerTwo.name}</p>
                <p className="text-gray-400 text-sm font-normal leading-normal">{playerTwo.address}</p>
                <p className="text-gray-400 text-sm font-normal leading-normal">Captured: {playerTwo.captured}</p>
              </div>
            </div>
            {/* Timer */}
            <div className="flex gap-2">
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-background-dark">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">08</p>
                </div>
                <p className="text-gray-400 text-xs font-normal">Min</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-background-dark">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">45</p>
                </div>
                <p className="text-gray-400 text-xs font-normal">Sec</p>
              </div>
            </div>
          </div>
        </div>
        {/* Chessboard */}
        <div className="flex w-full grow aspect-square bg-white/5 rounded-xl p-2">
          <Chessboard
            {...{
              boardWidth: 560,
              position: fen,
              onPieceDrop: onDrop,
              customBoardStyle: {
                borderRadius: '4px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              },
              customDarkSquareStyle: { backgroundColor: '#4A4A4A' },
              customLightSquareStyle: { backgroundColor: '#EAEAEA' },
            }}
          />
        </div>
        {/* Player One Header */}
        <div className="flex p-4 @container rounded-xl bg-white/5">
          <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
            <div className="flex gap-4 items-center">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-16 w-16"
                style={{ backgroundImage: `url("${playerOne.avatar}")` }}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">{playerOne.name}</p>
                <p className="text-gray-400 text-sm font-normal leading-normal">{playerOne.address}</p>
                <p className="text-gray-400 text-sm font-normal leading-normal">Captured: {playerOne.captured}</p>
              </div>
            </div>
            {/* Timer */}
            <div className="flex gap-2">
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-background-dark">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">09</p>
                </div>
                <p className="text-gray-400 text-xs font-normal">Min</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-background-dark">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">30</p>
                </div>
                <p className="text-gray-400 text-xs font-normal">Sec</p>
              </div>
            </div>
          </div>
        </div>
        {/* ActionsBar */}
        <div className="rounded-xl bg-white/5 p-2">
          <div className="gap-2 grid-cols-[repeat(auto-fit,_minmax(80px,_1fr))] grid">
            <div className="flex flex-col items-center gap-2 py-2.5 text-center cursor-pointer hover:bg-white/10 rounded-lg">
              <div className="rounded-full bg-background-dark p-2.5">
                <span className="material-symbols-outlined text-white" style={{ fontSize: "20px" }}>handshake</span>
              </div>
              <p className="text-white text-sm font-medium leading-normal">Offer Draw</p>
            </div>
            <div className="flex flex-col items-center gap-2 py-2.5 text-center cursor-pointer hover:bg-white/10 rounded-lg">
              <div className="rounded-full bg-background-dark p-2.5">
                <span className="material-symbols-outlined text-white" style={{ fontSize: "20px" }}>flag</span>
              </div>
              <p className="text-white text-sm font-medium leading-normal">Resign</p>
            </div>
            <div className="flex flex-col items-center gap-2 py-2.5 text-center cursor-pointer hover:bg-white/10 rounded-lg">
              <div className="rounded-full bg-background-dark p-2.5">
                <span className="material-symbols-outlined text-white" style={{ fontSize: "20px" }}>swap_horiz</span>
              </div>
              <p className="text-white text-sm font-medium leading-normal">Flip Board</p>
            </div>
          </div>
        </div>
      </div>
      {/* Right Column: Information Panel */}
      <div className="flex flex-col w-full lg:w-96 gap-6 bg-white/5 rounded-xl p-6">
        {/* Game Status */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-white">Game Status</h3>
          <div className="bg-primary/20 text-primary-300 rounded-lg p-3 text-center font-semibold">
            <p>{game.turn() === 'w' ? "White's Turn" : "Black's Turn"}</p>
          </div>
        </div>
        {/* Move History */}
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="text-lg font-bold text-white">Move History</h3>
          <div className="bg-background-dark rounded-lg p-3 flex-1 overflow-y-auto">
            <ol className="grid grid-cols-3 gap-x-4 gap-y-1 text-sm text-gray-300">
              {moveHistory.map((move, index) => (
                move && (
                  <>
                    <li key={`${index}-move`} className="flex gap-2"><span className="font-bold text-gray-500">{move.move}.</span> {move.white}</li>
                    <li key={`${index}-black`} className="col-span-2">{move.black}</li>
                  </>
                )
              ))}
            </ol>
          </div>
        </div>
        {/* Web3 Status */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-white">Blockchain Info</h3>
          <div className="flex flex-col gap-3 bg-background-dark rounded-lg p-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">On-Chain State</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-green-400">Confirmed</span>
              </div>
            </div>
            <a className="flex justify-between items-center text-sm text-primary hover:underline" href="#">
              <span>View on Basescan</span>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>open_in_new</span>
            </a>
            <div className="pt-2 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-2">Last Move Tx:</p>
              <a className="text-xs text-primary font-mono break-all hover:underline" href="#">0x1a2b...cdef</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GamePage;
