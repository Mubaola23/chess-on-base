"use client";

import { useState } from 'react';
import { useWeb3 } from '@/lib/hooks/useWeb3';
import { useRouter } from 'next/navigation';
import { ethers, isAddress } from 'ethers';
import { contractABI } from '@/lib/contract';

const CreateGamePage = () => {
  const [opponentType, setOpponentType] = useState('friend');
  const [gameType, setGameType] = useState('rated');
  const [timeControl, setTimeControl] = useState('10 min + 5 sec');
  const [opponentAddress, setOpponentAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { createGame } = useWeb3();
  const router = useRouter();

  const handleCreateGame = async () => {
    if (!opponentAddress || !isAddress(opponentAddress)) {
      alert('Please enter a valid opponent address');
      return;
    }
    setIsLoading(true);
    try {
      const receipt = await createGame(opponentAddress);
      if (receipt) {        console.log("receipt:",receipt);

        const iface = new ethers.Interface(contractABI);
        const parsedLogs = receipt.logs.map((log: any) => {
          try {
            return iface.parseLog(log);
          } catch (e) {
            return null;
          }
        });
        console.log("parsed logs:", parsedLogs);
        const gameCreatedLog = parsedLogs.find((log: any) => log?.name === 'GameCreated');
        if (gameCreatedLog) {
          const gameId = gameCreatedLog.args[0].toString();
          router.push(`/game/${gameId}`);
        } else {
          console.error('GameCreated event not found in transaction receipt');
        }
      }
    } catch (error) {
      console.error('Failed to create game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 justify-center py-5 px-4 sm:px-10 md:px-20">
      <div className="flex flex-col w-full max-w-7xl">
        <div className="flex flex-wrap justify-between gap-3 p-4 mb-4">
          <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Create a New Game</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
          {/* Left Column: Game Setup */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Opponent Section */}
            <div className="bg-[#272728] rounded-xl p-6">
              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-5">Opponent</h2>
              <div className="pb-3">
                <div className="flex border-b border-white/10 gap-8">
                  <button
                    onClick={() => setOpponentType('friend')}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      opponentType === 'friend' ? 'border-b-primary text-white' : 'border-b-transparent text-[#9da6b9] hover:text-white'
                    }`}
                  >
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Invite Friend</p>
                  </button>
                  <button
                    onClick={() => setOpponentType('random')}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      opponentType === 'random' ? 'border-b-primary text-white' : 'border-b-transparent text-[#9da6b9] hover:text-white'
                    }`}
                  >
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Random Match</p>
                  </button>
                </div>
              </div>
              <div className="flex w-full flex-wrap items-end gap-4 py-3">
                <label className="flex flex-col flex-1">
                  <p className="text-[#EFEFEF] text-base font-medium leading-normal pb-2">Opponent's Wallet Address</p>
                  <div className="flex w-full flex-1 items-stretch rounded-lg">
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-white/20 bg-background-dark focus:border-primary h-14 placeholder:text-gray-500 p-[15px] rounded-r-none border-r-0 text-base font-normal leading-normal"
                      placeholder="Enter ENS or 0x address..."
                      disabled={opponentType === 'random'}
                      value={opponentAddress}
                      onChange={(e) => setOpponentAddress(e.target.value)}
                    />
                    <button className="text-gray-400 hover:text-white flex border border-white/20 bg-background-dark items-center justify-center px-[15px] rounded-r-lg border-l-0">
                      <span className="material-symbols-outlined">content_copy</span>
                    </button>
                  </div>
                </label>
                <button className="flex min-w-[84px] h-14 cursor-pointer items-center justify-center overflow-hidden rounded-lg px-4 bg-primary/20 text-primary hover:bg-primary/30 text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Share Invite</span>
                </button>
              </div>
            </div>

            {/* Game Parameters Section */}
            <div className="bg-[#272728] rounded-xl p-6">
              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-5">Game Parameters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <p className="text-[#EFEFEF] text-base font-medium leading-normal">Game Type</p>
                  <div className="flex gap-2 p-1 bg-background-dark rounded-lg border border-white/10">
                    <button
                      onClick={() => setGameType('rated')}
                      className={`flex-1 text-center py-2 px-4 rounded-md text-sm font-bold ${
                        gameType === 'rated' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      Rated
                    </button>
                    <button
                      onClick={() => setGameType('casual')}
                      className={`flex-1 text-center py-2 px-4 rounded-md text-sm font-bold ${
                        gameType === 'casual' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      Casual
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-[#EFEFEF] text-base font-medium leading-normal">Time Control</p>
                  <div className="relative">
                    <select
                      value={timeControl}
                      onChange={(e) => setTimeControl(e.target.value)}
                      className="appearance-none form-select w-full rounded-lg text-white focus:outline-0 focus:ring-0 border border-white/20 bg-background-dark focus:border-primary h-14 placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal"
                    >
                      <option>10 min + 5 sec</option>
                      <option>15 min + 10 sec</option>
                      <option>30 min</option>
                      <option>Custom</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Range for Random Match */}
            <div className={`bg-[#272728] rounded-xl p-6 transition-opacity ${opponentType === 'friend' ? 'opacity-50' : 'opacity-100'}`}>
              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-5">Matchmaking Settings</h2>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <p className="text-[#EFEFEF] text-base font-medium leading-normal">Opponent Rating Range</p>
                  <p className="text-white font-bold text-lg">1200 - 1600</p>
                </div>
                <input
                  className="w-full"
                  disabled={opponentType === 'friend'}
                  max="2800"
                  min="400"
                  step="100"
                  type="range"
                  defaultValue="1400"
                />
                {opponentType === 'friend' && <p className="text-sm text-gray-500">Enable "Random Match" to adjust rating range.</p>}
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#272728] rounded-xl p-6 sticky top-10">
              <h3 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] pb-6 border-b border-white/10">Game Summary</h3>
              <div className="py-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Opponent</span>
                  <span className="text-white font-medium capitalize">{opponentType === 'friend' ? 'Friend Invite' : 'Random Match'}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Game Type</span>
                  <span className="text-white font-medium capitalize">{gameType}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Time Control</span>
                  <span className="text-white font-medium">{timeControl}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1.5 tooltip">
                    <span className="text-gray-400">Est. Network Fee</span>
                    <span className="material-symbols-outlined text-gray-500 text-base">help</span>
                    <span className="tooltiptext">This is the estimated cost to submit the transaction on the Base network. It may vary based on network congestion.</span>
                  </div>
                  <span className="text-white font-medium">~0.0001 ETH</span>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <button
                  className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors disabled:opacity-50"
                  onClick={handleCreateGame}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <span className="truncate">Create Game &amp; Sign</span>
                  )}
                </button>
                <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent text-gray-400 text-base font-bold leading-normal tracking-[0.015em] hover:bg-white/5 hover:text-white transition-colors">
                  <span className="truncate">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Custom styles for the range slider */
        input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            cursor: pointer;
            outline: none;
            border-radius: 9999px;
            background: #101622;
            height: 8px;
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 16px;
            width: 16px;
            background-color: #f6f6f8;
            border-radius: 50%;
            border: none;
            transition: .2s ease-in-out;
        }
        input[type="range"]::-moz-range-thumb {
            height: 16px;
            width: 16px;
            background-color: #f6f6f8;
            border-radius: 50%;
            border: none;
            transition: .2s ease-in-out;
        }
        input[type="range"]:active::-webkit-slider-thumb {
            transform: scale(1.1);
        }
        input[type="range"]:active::-moz-range-thumb {
            transform: scale(1.1);
        }
        .tooltip {
            position: relative;
            display: inline-block;
        }
        .tooltip .tooltiptext {
            visibility: hidden;
            width: 200px;
            background-color: #272728;
            color: #EFEFEF;
            text-align: center;
            border-radius: 0.5rem;
            padding: 8px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -100px;
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 12px;
            font-weight: 400;
        }
        .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default CreateGamePage;
