import { useWeb3React } from '@web3-react/core';
import { metaMask } from '@/lib/connectors';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@/lib/contract';

export const useWeb3 = () => {
  const { connector, account, isActive, chainId, provider } = useWeb3React();

  const connectWallet = async () => {
    try {
      await metaMask.activate();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    try {
      if (connector?.deactivate) {
        connector.deactivate();
      }
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  const createGame = async (opponentAddress: string) => {
    if (!provider || !account) {
      console.error('Wallet not connected');
      return;
    }

    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.createGame(opponentAddress);
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      console.error('Failed to create game:', error);
    }
  };

  return { connectWallet, disconnectWallet, isActive, chainId, account, createGame };
};
