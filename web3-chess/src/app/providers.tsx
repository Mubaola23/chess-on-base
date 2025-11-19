'use client';

import { Web3ReactProvider } from '@web3-react/core';
import { metaMask, hooks } from '@/lib/connectors';
import { MetaMask } from '@web3-react/metamask';
import { Web3ReactHooks } from '@web3-react/core';

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, hooks]];

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3ReactProvider connectors={connectors}>
      {children}
    </Web3ReactProvider>
  );
}
