import { useWeb3React } from '@web3-react/core';
import { metaMask } from '@/lib/connectors';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@/lib/contract';
import { BASE_SEPOLIA_CHAIN_ID, BASE_SEPOLIA_RPC_URL } from '@/lib/chains';
import { useState, useEffect, useMemo } from 'react';

export const useWeb3 = () => {
  const { connector, account, isActive, chainId } = useWeb3React();
  const provider = connector?.provider ? new ethers.BrowserProvider(connector.provider) : undefined;
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const readOnlyProvider = useMemo(() => new ethers.JsonRpcProvider(BASE_SEPOLIA_RPC_URL), []);
  const readOnlyContract = useMemo(() => new ethers.Contract(contractAddress, contractABI, readOnlyProvider), [readOnlyProvider]);

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
    } catch (error: any) {
      console.error('Failed to create game:', error);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      throw error;
    }
  };

  return { connectWallet, disconnectWallet, isActive, chainId, account, createGame, contract, readOnlyContract };
};
