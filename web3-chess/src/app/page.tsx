"use client";

import { JoinGame } from '@/components/JoinGame';
import { sdk } from '@farcaster/miniapp-sdk';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        sdk.actions.ready();
    }, []);

  return (
    <main>
      <JoinGame />
    </main>
  );
}
