import { useWeb3React } from '@web3-react/core';
import { metaMask } from '@/lib/connectors';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@/lib/contract';
import { BASE_SEPOLIA_CHAIN_ID, BASE_SEPOLIA_RPC_URL, BASE_SEPOLIA } from '@/lib/chains';
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

  const switchOrAddNetwork = async () => {
    if (!provider) return;
    try {
      await provider.send('wallet_switchEthereumChain', [{ chainId: `0x${BASE_SEPOLIA_CHAIN_ID.toString(16)}` }]);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await provider.send('wallet_addEthereumChain', [
            {
              chainId: `0x${BASE_SEPOLIA.chainId.toString(16)}`,
              chainName: BASE_SEPOLIA.chainName,
              nativeCurrency: BASE_SEPOLIA.nativeCurrency,
              rpcUrls: BASE_SEPOLIA.rpcUrls,
              blockExplorerUrls: BASE_SEPOLIA.blockExplorerUrls,
            },
          ]);
        } catch (addError) {
          console.error('Failed to add network:', addError);
        }
      }
      console.error('Failed to switch network:', switchError);
    }
  };

  const createGame = async (opponentAddress: string) => {
    if (!contract) {
      console.error('Contract not initialized');
      return;
    }

    if (chainId !== BASE_SEPOLIA_CHAIN_ID) {
      await switchOrAddNetwork();
      // At this point, the user should be on the correct network.
      // We might need to wait for the chainId to update in the state.
      // For now, we'll proceed, and if it fails, the user can try again.
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
