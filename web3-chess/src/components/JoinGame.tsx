"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const JoinGame = () => {
  const [gameId, setGameId] = useState('');
  const router = useRouter();

  const handleJoinGame = () => {
    if (gameId) {
      router.push(`/game/${gameId}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6">Web3 Chess</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder="Enter Game ID"
            className="p-3 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleJoinGame}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition duration-300"
          >
            Join Game
          </button>
          <Link
            href="/play/new"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 block"
          >
            Create New Game
          </Link>
        </div>
      </div>
    </div>
  );
};
