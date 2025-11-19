'use client';

import Link from 'next/link';
import { useWeb3 } from '@/lib/hooks/useWeb3';

const Header = () => {
  const { connectWallet, disconnectWallet, active, account } = useWeb3();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-50 flex justify-center border-b border-solid border-white/10 bg-background-dark/80 backdrop-blur-sm">
      <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-10 py-3 w-full max-w-7xl">
        <div className="flex items-center gap-4 text-white">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Web3 Chess</h2>
        </div>
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
              <Link href="/play/new" className="text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors">Play Game</Link>
            <Link href="/leaderboard" className="text-white text-sm font-bold leading-normal relative">Leaderboard<span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span></Link>
            <Link href="/tutorial" className="text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors">Tutorial</Link>
            <Link href="/profile/new" className="text-gray-300 hover:text-white text-sm font-medium leading-normal transition-colors">Profile</Link>
          </div>
          <button
            onClick={active ? disconnectWallet : connectWallet}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
          >
            <span className="truncate">{active && account ? truncateAddress(account) : 'Connect Wallet'}</span>
          </button>
        </div>
        <button className="md:hidden text-white">
          <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
