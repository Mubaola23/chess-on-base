import { useWeb3React } from '@web3-react/core';
import { metaMask } from '@/lib/connectors';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@/lib/contract';
import { BASE_SEPOLIA_CHAIN_ID } from '@/lib/chains';
import { useState, useEffect } from 'react';

export const useWeb3 = () => {
  const { connector, account, isActive, chainId, provider: eip1193Provider } = useWeb3React();
  const provider = eip1193Provider ? new ethers.BrowserProvider(eip1193Provider) : undefined;
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const setupContract = async () => {
      if (provider && account) {
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contractInstance);
      }
    };
    setupContract();
  }, [provider, account]);

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
    if (!contract) {
      console.error('Contract not initialized');
      return;
    }

    if (chainId !== BASE_SEPOLIA_CHAIN_ID) {
      try {
        await metaMask.activate(BASE_SEPOLIA_CHAIN_ID);
      } catch (error) {
        console.error('Failed to switch network:', error);
        return;
      }
    }

    try {
      const tx = await contract.createGame(opponentAddress);
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      console.error('Failed to create game:', error);
      throw error;
    }
  };

  return { connectWallet, disconnectWallet, isActive, chainId, account, createGame, contract };
};
