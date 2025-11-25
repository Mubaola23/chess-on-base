import { useWeb3React } from '@web3-react/core';
import { metaMask } from '@/lib/connectors';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@/lib/contract';
import { BASE_SEPOLIA_CHAIN_ID } from '@/lib/chains';

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

    if (chainId !== BASE_SEPOLIA_CHAIN_ID) {
      try {
        await metaMask.activate(BASE_SEPOLIA_CHAIN_ID);
        // After switching, the provider and signer need to be re-established.
        // A page reload or a more complex state management would be needed here.
        // For now, we'll just proceed, assuming the user is now on the correct network.
      } catch (error) {
        console.error('Failed to switch network:', error);
        return;
      }
    }

    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.createGame(opponentAddress);
      console.log("tx hash:", tx.hash);
      const receipt = await provider.waitForTransaction(tx.hash, 1);
      return receipt;
    } catch (error) {
      console.error('Failed to create game:', error);
      throw error;
    }
  };

  return { connectWallet, disconnectWallet, isActive, chainId, account, createGame };
};
