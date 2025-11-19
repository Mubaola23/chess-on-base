
import { useWeb3React } from '@web3-react/core';
import { metaMask } from '@/lib/connectors';

export const useWeb3 = () => {
  const { connector, account, active, chainId } = useWeb3React();

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

  return { connectWallet, disconnectWallet, active, chainId, account };
};
