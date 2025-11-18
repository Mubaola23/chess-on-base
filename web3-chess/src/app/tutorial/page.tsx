const TutorialPage = () => {
  return (
    <div className="flex h-full flex-1">
      {/* SideNavBar */}
      <aside className="w-64 flex-shrink-0 border-r border-slate-200/10 p-4 flex flex-col justify-between">
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAfbb9P6PMAG-BCE9ToiPwbHUeoz-Tt9Q_aoUlZaHPEgxKT7c1hRjrULkd0UiXoaH4UkXj3KQ8cKrh8H6H_uA7D9aa3U2TXxn8TI5JwotMsFto0D_6tg9UM-bOO2HKgci1hGRpJGW2ayx7nrR10jVZ8c9-xdQgmYpKxlHJSfR84EsB3Zi6_jgPE5GySMo3YBqsR5hHdtPbgi-IGrb26QqroanZkJlNrwBqbAO2yH9AH0rOtJLIcM-WwlOBrxdYiV5136Tb5nh5JX1M")' }}
              ></div>
              <div className="flex flex-col">
                <h1 className="text-white text-base font-medium leading-normal">BaseChess</h1>
                <p className="text-slate-400 text-sm font-normal leading-normal">Tutorial</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2 mt-4">
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 text-primary" href="#fundamentals">
                <span className="material-symbols-outlined text-lg">view_in_ar</span>
                <p className="text-sm font-medium leading-normal">Chess Fundamentals</p>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50" href="#interface">
                <span className="material-symbols-outlined text-lg">mouse</span>
                <p className="text-sm font-medium leading-normal">Game Interface</p>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50" href="#web3">
                <span className="material-symbols-outlined text-lg">hub</span>
                <p className="text-sm font-medium leading-normal">Web3 Integration</p>
              </a>
            </nav>
          </div>
        </div>
        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:bg-primary/90 transition-colors">
          <span className="truncate">Play a Game</span>
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Progress Bar */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex gap-6 justify-between items-center">
              <p className="text-slate-300 text-sm font-medium leading-normal">Tutorial Progress</p>
              <p className="text-slate-300 text-sm font-bold leading-normal">1/3 Complete</p>
            </div>
            <div className="rounded-full bg-slate-700/50 h-2">
              <div className="h-2 rounded-full bg-primary" style={{ width: "33%" }}></div>
            </div>
          </div>
          {/* Page Heading */}
          <div className="flex flex-wrap justify-between gap-3 mb-6">
            <p className="text-white text-4xl font-black leading-tight tracking-tighter">How to Play BaseChess</p>
          </div>
          {/* Body Text */}
          <p className="text-slate-300 text-base font-normal leading-relaxed pb-3 pt-1 mb-8">
            Welcome to the world of decentralized chess. This guide will walk you through the basics of chess, how to use our interface, and what it means to play on the Base network.
          </p>
          {/* Section: Chess Fundamentals */}
          <section className="mb-12" id="fundamentals">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-tight pt-5 pb-4 border-t border-slate-200/10">Chess Fundamentals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Accordion Item 1 */}
              <div className="bg-slate-800/40 rounded-lg">
                <div className="flex items-center justify-between p-4 cursor-pointer">
                  <h3 className="text-white font-medium">The Pieces &amp; Their Moves</h3>
                  <span className="material-symbols-outlined text-slate-400">expand_more</span>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-slate-400 text-sm leading-relaxed">Each piece moves in a unique way. Learning them is the first step to mastering the game.</p>
                  <div className="mt-4 aspect-video bg-cover bg-center rounded-md" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAL38a1QQAmR3UoNg1y7oBwQ7I0Pqa3biokrJhAYIZXucFeKGI0ZOq5ZXhT63punt0ythf3Wgh1G2Q-Pv74RzcxHUdHDRU8yDpOOazjnFMK-waMurPlSv60Nc2PDWOVW97PvWZ6VEyVDoR_uaCsiuBk1xyEkgLzznk7kuVwHp1mDIXxeQix-yBpRybAJ5E3rmr35knF9V-3C59H8V2v6U_osq2V0POrJfxmjcufxz1sl08-ccSwKQB6gWowsdrvrN0wrhtc5CBukTk')" }}></div>
                </div>
              </div>
              {/* Accordion Item 2 */}
              <div className="bg-slate-800/40 rounded-lg">
                <div className="flex items-center justify-between p-4 cursor-pointer">
                  <h3 className="text-white font-medium">Special Moves</h3>
                  <span className="material-symbols-outlined text-slate-400">expand_more</span>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-slate-400 text-sm leading-relaxed">Beyond basic moves, there are three special moves: Castling, En Passant, and Pawn Promotion.</p>
                  <div className="mt-4 aspect-video bg-cover bg-center rounded-md" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCosForb1cKRZsg1tdeuq2Gln8G0YpaGzA-EJzBXS22wUiXq8vRz27IG1zJUusDjx9mBjfERNyxUVn5q-buFxTQ57wilV6wgc9ntojRyu4KpSzZnu49Znp4uaNgCpAZDtHCyu3w53qx6dxC8Za4rtt2XWokOprkAyiR_hd5mQ9leqG-V57AONBRzXnkrZus7hts2MDoAwlfTZJwdkVW7JRrn6pSVNAPuV-jc_JEdIdJUNQg7-zZi1EQ0EFORMIo-M_QvGP_k9KWoWI')" }}></div>
                </div>
              </div>
            </div>
          </section>
          {/* Section: Game Interface */}
          <section className="mb-12" id="interface">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-tight pt-5 pb-4 border-t border-slate-200/10">Using the Game Interface</h2>
            <p className="text-slate-300 text-base font-normal leading-relaxed pb-3 pt-1 mb-4">
              Our interface is designed to be clean and intuitive. Here’s a quick tour of the key features to get you started.
            </p>
            <div className="relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <img className="w-full h-auto object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcY94nBINDjQt-tnbrqHcs3ae256PaE3M80e6O-wD6Jl1D7tkYI41lT1gUtXcx_vllwtU9UhjhtTBB52jZ0_diLvrsO56hYqS_jjnv5vAGAMTEg3R0ur7POtfgAeepJrsSR254CkMC0wEJnPsG1aItZeshbPKLDX_zgTYqxhKSLK_PLuiUvpiv4SaMCvbKoVlTmHNN1wQpbAwMooZiOlsWLH1TbLVRbUoZDBseLAb8qEttc16JfHjp974eDausdAE8ssTDkYBFTVY" alt="Screenshot of the BaseChess game interface with highlighted areas" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white font-bold text-xl">The Game Board</h3>
                <p className="text-slate-200 mt-1 max-w-xl">The main view shows the board, timers, move history, and player information. Simply click or drag a piece to make your move.</p>
              </div>
            </div>
          </section>
          {/* Section: Web3 Integration */}
          <section className="mb-12" id="web3">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-tight pt-5 pb-4 border-t border-slate-200/10">Understanding the Web3 Integration</h2>
            <p className="text-slate-300 text-base font-normal leading-relaxed pb-3 pt-1 mb-4">
              BaseChess leverages the power of the Base network to create a permanent, verifiable record of every game.
            </p>
            <div className="flex flex-col gap-4">
              <div className="bg-slate-800/40 p-4 rounded-lg flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-2xl mt-1">account_balance_wallet</span>
                <div>
                  <h4 className="text-white font-medium">Connect Your Wallet</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mt-1">To play, connect a web3 wallet like Coinbase Wallet or MetaMask. This is your identity on the decentralized web and how you'll sign moves.</p>
                </div>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-lg flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-2xl mt-1">receipt_long</span>
                <div>
                  <h4 className="text-white font-medium">On-Chain Moves &amp; Gas Fees</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mt-1">Each move you make is recorded as a transaction on the Base blockchain. This requires a small "gas fee" to process. Thanks to Base, these fees are minimal.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* Right Sidebar */}
      <aside className="w-72 flex-shrink-0 border-l border-slate-200/10 p-6 hidden lg:block">
        <div className="sticky top-6">
          <h3 className="text-white font-bold tracking-wide">Web3 Glossary</h3>
          <div className="mt-4 flex flex-col gap-4">
            <div className="bg-slate-800/40 p-4 rounded-lg">
              <h4 className="text-white font-medium text-sm">Gas Fees</h4>
              <p className="text-slate-400 text-xs leading-normal mt-1">The cost to execute a transaction on the blockchain. Paid to network validators.</p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-lg">
              <h4 className="text-white font-medium text-sm">Base Network</h4>
              <p className="text-slate-400 text-xs leading-normal mt-1">A secure, low-cost, and developer-friendly Ethereum Layer 2 solution built by Coinbase.</p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-lg">
              <h4 className="text-white font-medium text-sm">On-Chain</h4>
              <p className="text-slate-400 text-xs leading-normal mt-1">Refers to actions or data that are recorded and verified on the blockchain itself.</p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-lg">
              <h4 className="text-white font-medium text-sm">Wallet</h4>
              <p className="text-slate-400 text-xs leading-normal mt-1">A digital wallet used to store cryptocurrency and interact with decentralized applications.</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default TutorialPage;
