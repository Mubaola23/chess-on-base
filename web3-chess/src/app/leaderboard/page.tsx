const LeaderboardPage = () => {
  const players = [
    {
      rank: 1,
      name: "MagnusC",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd-DHb9BIRelv-3dgB1SEVt-f2ypYwP5KqMN9FBJLWiga27UZvUwEGm1HQi6-8p4UxqAUO575qKpj_i6JDUGSLD3cqmuCRHDpEiXsSs-kVK7GB43CiWad2Qw4gZeH695GLy-UcsxBBYEl04eAICVOM-7p7Ndkpb8qxzGAcuWFdDZDJdrKM2teq1earByylhev8RiIdSLy7gr_ugFW6KCvZIQ05e8xvuKCLtc8mHub1HHyfjCE2WrSwRgVVf0peWK0C001T6aV3JZI",
      rating: 2830,
      wld: "150 / 80 / 20",
      totalGames: 250,
    },
    {
      rank: 2,
      name: "Hikaru",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuASZMwdEmqv68GGsS7iDycOmyrohCD_nXzsxCy8gwmiqxZPwgNy11zGeJe1jc4emyttvEYpgiFiMyL1UocTT-a3icbshQALBoLDoJcMHQ72wba4gCr_95ZlZOSbE6U-sLlWo1yolQOVJfhTN4mTy2sEPguqVITeVkm0KPMVOIyyIPLXEoLS_bTukH_GiIgyRHXXgVS-9ALLTCEboTdsJNGSTmatIcxvEivcA9e2wSm4u-uFHiZlEaGZPR2HLDAnT_T6xn9Ltgf2m8o",
      rating: 2805,
      wld: "145 / 82 / 23",
      totalGames: 250,
    },
    {
      rank: 3,
      name: "Alireza",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmcf_T3yhzTeh51OqfhAILSn00hfQG_01OS7EbWnFiISYUloCIeqLIMiMAjMadnXK4XEzFmwOMkuNbI838rKRch56lSW0vO-zf_YfEOtqFphtQM0k1ZABO_TIbRF689aZwIZv4bcMyLuvDKuywGujfNvDaaORrZwXo5JFeEiE4ryY9TWOWZuqa36FXVV8gfwstVUF1wISOlIAzoh-rsu8h1Rnk9dc9uN4BtZQOFdrWGEGsYEA-T0mvzh2raSfxNuvCnuH67_k7ruo",
      rating: 2788,
      wld: "140 / 85 / 25",
      totalGames: 250,
    },
    {
      rank: 4,
      name: "Fabiano",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBweyG1DHmTFz-8E1QVOUl623c6ZWmg4StLHLr995ROEx5xGyQIWquYSyFCBUKae8G6py-l1puz4SxnFft2GHiJDbcnXf8EnpEHG_wDoG8gBWipKPoQtXLvuNNv40RhLkdEuOEkdcZUQ1VSLvqlMXKqZHzyhwrL1MGCVCOdyNMJCd74F1EaboO0Zpz5SAfUfrQ5JN7UfW8BDc0dKr9gOOyJpSJuqtK8_EnakeUlmccxwKDidF1QtrOADBKTTtnJ-nZ7m6CelMOnCp8",
      rating: 2761,
      wld: "138 / 88 / 24",
      totalGames: 250,
    },
  ];

  const myRank = {
    rank: 158,
    name: "MyRank_User (You)",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOFBbn02zriHesv0kEJXvAV6s09nyPrrmGPM_kIs7ZUcYf502EvK5PL5o9ShXU3YhujZxmEmMjvvgaWIJf-E1J_OCxqSIu6U-E4sxRQkWrpZaSlsEZMa5bfsV0G1ZR_u2-9UYqFb5rCtG3iVm87MdJMsgxYBKytLlXMHUGt2gnkNk6J6E1Z37yjq2uP5ynicxAsFmZ0WzSS4EzqDXH9Zis6nAMYAa4V7Ex5q32FKGRrWd5apow_cdTWZTBgz9EmIaANpM8vYJVcbI",
    rating: 1650,
    wld: "50 / 45 / 5",
    totalGames: 100,
  };

  return (
    <div className="px-4 sm:px-10 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1">
        <div className="flex flex-wrap justify-between gap-4 py-8 items-center">
          <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Global Rankings</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md px-4 bg-primary text-white shadow-md">
              <p className="text-sm font-medium leading-normal">All-Time</p>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md px-4 hover:bg-white/10">
              <p className="text-gray-300 text-sm font-medium leading-normal">This Season</p>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md px-4 hover:bg-white/10">
              <p className="text-gray-300 text-sm font-medium leading-normal">This Week</p>
            </button>
          </div>
          <div className="flex-grow">
            <label className="flex flex-col min-w-40 h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-gray-400 flex border-none bg-[#282e39] items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-inset border-none bg-[#282e39] h-full placeholder:text-gray-400 px-4 pl-2 text-base font-normal leading-normal" placeholder="Search by player name or wallet address" />
              </div>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3 @container">
          <div className="flex overflow-hidden rounded-xl border border-[#3b4354] bg-[#1c1f27]/50">
            <table className="w-full">
              <thead className="border-b border-b-[#3b4354]">
                <tr className="bg-white/5">
                  <th className="table-rank px-4 py-3 text-left text-gray-300 w-16 text-sm font-medium leading-normal">Rank</th>
                  <th className="table-player px-4 py-3 text-left text-gray-300 text-sm font-medium leading-normal">Player</th>
                  <th className="table-rating px-4 py-3 text-left text-gray-300 text-sm font-medium leading-normal cursor-pointer hover:text-white">Rating (ELO) <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle' }}>swap_vert</span></th>
                  <th className="table-wld px-4 py-3 text-left text-gray-300 text-sm font-medium leading-normal">W/L/D</th>
                  <th className="table-games px-4 py-3 text-left text-gray-300 text-sm font-medium leading-normal">Total Games</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.rank} className="border-t border-t-[#3b4354] hover:bg-primary/10 transition-colors cursor-pointer">
                    <td className="table-rank h-[72px] px-4 py-2 text-white text-lg font-bold">{player.rank}</td>
                    <td className="table-player h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">
                      <div className="flex items-center gap-3">
                        <img className="h-10 w-10 rounded-full object-cover" src={player.avatar} alt={`Avatar for ${player.name}`} />
                        <span className="font-semibold">{player.name}</span>
                      </div>
                    </td>
                    <td className="table-rating h-[72px] px-4 py-2 text-white text-sm font-semibold leading-normal">{player.rating}</td>
                    <td className="table-wld h-[72px] px-4 py-2 text-gray-300 text-sm font-normal leading-normal">{player.wld}</td>
                    <td className="table-games h-[72px] px-4 py-2 text-gray-300 text-sm font-normal leading-normal">{player.totalGames}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <style>
            {`
              @container(max-width: 600px) {
                .table-wld, .table-games { display: none; }
              }
              @container(max-width: 450px) {
                .table-rating { display: none; }
              }
            `}
          </style>
          <div className="flex items-center justify-center gap-4 text-white text-sm py-4">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-bold">1</button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 transition-colors">2</button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 transition-colors">3</button>
            <span>...</span>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 transition-colors">10</button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="sticky bottom-4 mx-auto w-full max-w-7xl px-4 sm:px-10 pointer-events-none">
          <div className="flex overflow-hidden rounded-xl border border-primary/50 bg-primary/20 backdrop-blur-md shadow-lg pointer-events-auto">
            <table className="w-full">
              <tbody>
                <tr className="bg-primary/20">
                  <td className="table-rank h-[72px] px-4 py-2 text-white text-lg font-bold w-16">{myRank.rank}</td>
                  <td className="table-player h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">
                    <div className="flex items-center gap-3">
                      <img className="h-10 w-10 rounded-full object-cover" src={myRank.avatar} alt="Logged-in user's avatar" />
                      <span className="font-semibold text-primary">{myRank.name}</span>
                    </div>
                  </td>
                  <td className="table-rating h-[72px] px-4 py-2 text-white text-sm font-semibold leading-normal">{myRank.rating}</td>
                  <td className="table-wld h-[72px] px-4 py-2 text-gray-300 text-sm font-normal leading-normal">{myRank.wld}</td>
                  <td className="table-games h-[72px] px-4 py-2 text-gray-300 text-sm font-normal leading-normal">{myRank.totalGames}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
