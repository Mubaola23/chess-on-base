const PlayerProfilePage = ({ params }: { params: { id: string } }) => {
  const player = {
    name: "Player One",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    elo: 1500,
    stats: {
      total: 25,
      wins: 15,
      losses: 8,
      draws: 2,
    },
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbDxrv3UFjPtpQvflG6PD4BOi36oZKSxoNLHqOc0X7NjY4lgOhswaUxp8YlOrAaR7uhD_ctGUITCEIcFh6SZpYMJHn5MJYIE1NOsUL8-kdJtQRO0k2YcPTAbAmS0NbbThM4Nyhxk_74zT0L9zkaEr33xtt5rBS8XkPlUFgEioSzsEjW8GSbWtibJUPHcWAZHz74ikP4vKOmp8PW_OCxdh7m4sK0oNVkARlBxikpTICm6lneGM1aR8t0i4wAHcWXOHl_7tgv6ebSZw",
  };

  const gameHistory = [
    {
      opponent: "Player Two",
      opponentAddress: "0xABCD...EFGH",
      opponentAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4avTti8d-91vqtPFN8eWHN-AeYBktIXXMFCm-tFZU-S8VUgBgipqi0utNyGdMuDQ-20vk4fXg1OrNZYS0nAl40CBsarK4xg2-PIU13_N7SDY6X3tNA2Ibn1tuOg10jLxXCXQHSpXdN8MPjLAIyFQh06KvwkO3LzJuZbQlVGQuHpFDyycNgrQUv3UZXQXza2VDfCswO9q0MseBzKnRRVZd_l-I276glVMKTfH9_GTwac714C8iiLapgaQD-Wunn5LgtCLS4akfC5c",
      result: "Win",
      moves: 42,
    },
    {
      opponent: "KnightGambit",
      opponentAddress: "0x4F8E...A3B1",
      opponentAvatar: "https://lh3.googleusercontent.com/a/ACg8ocJ-1234567890",
      result: "Loss",
      moves: 35,
    },
    {
      opponent: "CheckmateMaster",
      opponentAddress: "0x9C2D...F6A7",
      opponentAvatar: "https://lh3.googleusercontent.com/a/ACg8ocK-1234567890",
      result: "Draw",
      moves: 68,
    },
    {
      opponent: "BaseChainKing",
      opponentAddress: "0xBEF0...98D4",
      opponentAvatar: "https://lh3.googleusercontent.com/a/ACg8ocL-1234567890",
      result: "Win",
      moves: 51,
    },
  ];

  const getResultColor = (result: string) => {
    switch (result) {
      case "Win":
        return "bg-green-500/20 text-green-400";
      case "Loss":
        return "bg-red-500/20 text-red-400";
      case "Draw":
        return "bg-gray-500/20 text-gray-300";
      default:
        return "";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0"
            style={{ backgroundImage: `url("${player.avatar}")` }}
          ></div>
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-3xl sm:text-4xl font-bold leading-tight tracking-[-0.015em]">{player.name}</h1>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="font-mono text-sm">{player.address}</span>
              <button className="transition-colors hover:text-white">
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>content_copy</span>
              </button>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-lg">workspace_premium</span>
              <p className="text-lg font-bold">{player.elo} ELO</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-bold text-white">{player.stats.total}</p>
              <p className="text-sm text-gray-400">Total Games</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-bold text-green-400">{player.stats.wins}</p>
              <p className="text-sm text-gray-400">Wins</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-bold text-red-400">{player.stats.losses}</p>
              <p className="text-sm text-gray-400">Losses</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-bold text-gray-300">{player.stats.draws}</p>
              <p className="text-sm text-gray-400">Draws</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Game History</h2>
          <div className="flex flex-col bg-white/5 rounded-xl">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/10 text-xs text-gray-400 font-bold uppercase tracking-wider">
              <div className="col-span-5 sm:col-span-4">Opponent</div>
              <div className="col-span-3 sm:col-span-2 text-center">Result</div>
              <div className="hidden sm:block col-span-3 text-center">Moves</div>
              <div className="col-span-4 sm:col-span-3 text-right">Transaction</div>
            </div>
            <div className="divide-y divide-white/10">
              {gameHistory.map((game, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-white/5 transition-colors">
                  <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-8 w-8 hidden sm:block"
                      style={{ backgroundImage: `url("${game.opponentAvatar}")` }}
                    ></div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-white truncate">{game.opponent}</p>
                      <p className="text-xs text-gray-400 font-mono truncate">{game.opponentAddress}</p>
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-2 text-center">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getResultColor(game.result)}`}>
                      {game.result}
                    </span>
                  </div>
                  <div className="hidden sm:block col-span-3 text-center text-sm text-gray-300">{game.moves}</div>
                  <div className="col-span-4 sm:col-span-3 text-right">
                    <a className="inline-flex items-center gap-1.5 text-primary hover:underline text-sm" href="#">
                      <span>View</span>
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>open_in_new</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfilePage;
