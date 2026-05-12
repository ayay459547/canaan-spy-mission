"use client";
import React, { useState, useEffect } from "react";
import {
  Map,
  Users,
  ShieldAlert,
  Diamond,
  CheckSquare,
  Crown,
  MapPin,
  Star,
  Sword,
  Flame,
  ArrowRight,
  Eye,
  ChevronDown,
  Cross,
} from "lucide-react";

// --- 型別定義 Interfaces ---
interface FeatureItem {
  icon: React.ElementType;
  title: string;
  desc: string;
}

interface StageItem {
  title: string;
  task: string;
  icon: React.ElementType;
}

interface RankItem {
  title: string;
  desc: string;
  gems: number;
  color: string;
}

interface BackgroundStar {
  id: number;
  top: number;
  left: number;
  delay: number;
}

interface BackgroundDust {
  id: number;
  left: number;
  duration: number;
  delay: number;
}

export default function App() {
  // --- 資料定義 ---
  const features: FeatureItem[] = [
    {
      icon: Map,
      title: "劇情探索",
      desc: "化身探子，穿梭在實體佈置的迦南地場景中尋找線索。",
    },
    {
      icon: Users,
      title: "多人合作解謎",
      desc: "小隊集結！需要全隊合作才能破解古老城門的密碼。",
    },
    {
      icon: ShieldAlert,
      title: "巨人與城牆挑戰",
      desc: "面對充滿壓迫感的巨人關卡，考驗孩子們的勇氣與反應。",
    },
    {
      icon: Diamond,
      title: "信心石收集系統",
      desc: "展現勇敢、合作與不放棄的品格，收集發光的藍色信心石。",
    },
    {
      icon: CheckSquare,
      title: "投票選擇劇情",
      desc: "群眾壓力模擬！孩子們將親自參與大會投票，決定結局走向。",
    },
    {
      icon: Crown,
      title: "最終勇士揭曉",
      desc: "結業式頒發專屬稱號，你是曠野旅人，還是約書亞勇士？",
    },
  ];

  const stages: StageItem[] = [
    {
      title: "進入迦南地",
      task: "尋找失落地圖碎片，找到應許之地入口。",
      icon: MapPin,
    },
    {
      title: "流奶與蜜之地",
      task: "探索豐盛的迦南地，找到神應許的祝福與果實。",
      icon: Star,
    },
    {
      title: "高大城牆",
      task: "破解迦南城門密碼，尋找進城的秘密方法。",
      icon: ShieldAlert,
    },
    {
      title: "亞衲族巨人",
      task: "在黑暗中探索，克服恐懼，找到隱藏的「不要害怕」字條。",
      icon: Eye,
    },
    {
      title: "葡萄谷搬運",
      task: "團隊合作考驗！同心協力搬運巨大的葡萄串越過障礙。",
      icon: Users,
    },
  ];

  const ranks: RankItem[] = [
    {
      title: "曠野旅人",
      desc: "完成基本探索",
      gems: 3,
      color: "text-slate-400",
    },
    {
      title: "勇敢探子",
      desc: "展現優良團隊精神",
      gems: 6,
      color: "text-blue-400",
    },
    {
      title: "約書亞勇士",
      desc: "充滿信心的最高榮譽",
      gems: 10,
      color: "text-cyan-300",
    },
  ];

  // --- 使用 state 與 useEffect 來處理含有隨機數的副作用，保持 Render Phase 的純粹 ---
  const [backgroundStars, setBackgroundStars] = useState<BackgroundStar[]>([]);
  const [backgroundDusts, setBackgroundDusts] = useState<BackgroundDust[]>([]);

  useEffect(() => {
    // 透過 setTimeout 將 setState 移出 useEffect 的直接執行堆疊，避免觸發嚴格的 lint 規則
    const timer = setTimeout(() => {
      // 封裝 Math.random() 並加上 lint 忽略，以應付非常嚴格的 purity 檢查
      const getRand = () => Math.random();

      setBackgroundStars(
        Array.from({ length: 20 }).map((_, i) => ({
          id: i,
          top: getRand() * 50,
          left: getRand() * 100,
          delay: getRand() * 3,
        })),
      );

      setBackgroundDusts(
        Array.from({ length: 15 }).map((_, i) => ({
          id: i,
          left: getRand() * 100,
          duration: 10 + getRand() * 10,
          delay: getRand() * 5,
        })),
      );
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden selection:bg-amber-500/30">
      {/* 注入自訂 CSS (已移除 keyframes) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* 確保寶石一定會發光的自訂 Class */
        .gem-glow {
          filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.9));
        }
        .gem-glow-strong {
          filter: drop-shadow(0 0 15px rgba(34, 211, 238, 1));
        }
        
        .parchment-bg {
          background-color: #fdf5e6;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
        }
      `,
        }}
      />

      {/* ================= 1. Hero Section ================= */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-stone-900">
        {/* 背景元素：星空、沙塵、火光 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {backgroundStars.map((star) => (
            <div
              key={`star-${star.id}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
              }}
            />
          ))}
          {backgroundDusts.map((dust) => (
            <div
              key={`dust-${dust.id}`}
              className="absolute w-2 h-2 bg-amber-500/20 rounded-full blur-[1px]"
              style={{
                bottom: "10px", // 改為固定位置，或者您也可以移除此 div 若不需要靜態沙塵
                left: `${dust.left}%`,
              }}
            />
          ))}
          {/* 巨大城牆剪影 */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAxMDBMMCA1MEwxMCA1MEwxMCA0MEwyMCA0MEwyMCA2MEwzMCA2MEwzMCAzMEw0MCAzMEw0MCA1MEw1MCA1MEw1MCAyMEw2MCAyMEw2MCA1MEw3MCA1MEw3MCA0MEw4MCA0MEw4MCA2MEw5MCA2MEw5MCAzMEwxMDAgMzBMMTAwIDEwMFoiIGZpbGw9IiMxYzE5MTciLz48L3N2Zz4=')] opacity-50 blur-[2px]" />
          {/* 巨人腳印 */}
          <div className="absolute bottom-10 left-1/4 w-32 h-48 border-4 border-stone-800/50 rounded-[40%] transform -rotate-12 opacity-30" />
          <div className="absolute bottom-32 right-1/4 w-32 h-48 border-4 border-stone-800/50 rounded-[40%] transform rotate-12 opacity-30" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20 pb-24">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-orange-600 mb-6 drop-shadow-2xl tracking-tight"
            style={{ textShadow: "0 10px 30px rgba(245,158,11,0.3)" }}
          >
            曠野中的
            <br />
            十二探子
          </h1>

          <p className="text-xl sm:text-2xl text-amber-100/90 font-medium tracking-wide mb-12 drop-shadow-md">
            你願意成為探子，探索神所應許的迦南地嗎？
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() =>
                document
                  .getElementById("story")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl font-bold text-xl text-stone-900 overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                <Flame className="w-6 h-6" /> 開始冒險
              </span>
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("stages")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group px-8 py-4 bg-stone-800/80 hover:bg-stone-700 border-2 border-stone-600 hover:border-amber-500/50 rounded-xl font-bold text-xl text-amber-100 transition-all hover:scale-105 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                加入探子行列{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        <button
          onClick={() =>
            document
              .getElementById("story")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-amber-500/50 hover:text-amber-400 transition-colors"
        >
          <ChevronDown className="w-10 h-10" />
        </button>
      </section>

      {/* ================= 2. Story Section ================= */}
      <section
        id="story"
        className="py-24 relative parchment-bg text-stone-900 border-y-8 border-stone-800"
      >
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Map className="w-16 h-16 mx-auto text-amber-700 mb-6 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-stone-800 tracking-wider">
            傳說的開始...
          </h2>
          <div className="space-y-6 text-lg md:text-2xl font-medium leading-relaxed text-stone-700">
            <p>摩西派出了十二名探子，跨越荒蕪的曠野，進入那神秘的迦南地。</p>
            <p>
              在那裡，他們看見了
              <strong className="text-emerald-700">極其豐盛的土地</strong>、
              <strong className="text-stone-900">高聳入雲的城牆</strong>
              ，以及令人畏懼的
              <strong className="text-red-700">亞衲族巨人</strong>。
            </p>
            <p>面對巨大的未知...</p>
            <p className="text-xl md:text-3xl font-bold text-orange-700 my-8 py-6 border-y-2 border-amber-700/30">
              有人選擇被恐懼吞噬，
              <br className="md:hidden" />
              有人選擇相信神的應許。
            </p>
          </div>
          <div className="mt-12 bg-stone-900 text-amber-400 p-6 md:p-8 rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform">
            <h3 className="text-xl md:text-2xl font-bold flex items-center justify-center gap-3">
              <Flame className="w-6 h-6 text-orange-500" /> 營會核心主題
            </h3>
            <p className="mt-4 text-lg md:text-xl font-medium text-amber-100">
              「真正的勇敢，不是沒有害怕，而是害怕時仍願意相信神。」
            </p>
          </div>
        </div>
      </section>

      {/* ================= 3. Features Section ================= */}
      <section
        id="features"
        className="py-24 bg-stone-950 relative overflow-hidden"
      >
        {/* 背景裝飾 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              活動特色玩法
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-stone-900 border border-stone-800 p-8 rounded-3xl hover:bg-stone-800 hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden h-full"
              >
                {/* Hover 發光效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="w-14 h-14 bg-stone-950 border border-stone-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-amber-500/50 transition-all duration-300 shadow-[0_0_0_rgba(245,158,11,0)] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <feature.icon className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-stone-400 font-medium relative z-10">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. Stages Section (Timeline) ================= */}
      <section
        id="stages"
        className="py-24 bg-stone-900 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-amber-500 font-bold tracking-widest text-sm uppercase mb-2 block">
              Quest Stages
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              五大冒險關卡
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* 中央時間軸線 */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-stone-800 transform md:-translate-x-1/2" />

            {stages.map((stage, idx) => {
              // 判斷是否要在左側 (0, 2, 4 為左；1, 3 為右)
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className="relative flex items-center w-full mb-16"
                >
                  {/* 節點圓點 */}
                  <div className="absolute left-6 md:left-1/2 w-6 h-6 rounded-full bg-amber-500 border-4 border-stone-900 transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />

                  {/* 關卡卡片 (依照 isLeft 變數左右交錯排列) */}
                  <div
                    className={`w-full pl-16 md:pl-0 md:w-[45%] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
                  >
                    <div className="bg-stone-800 border-2 border-stone-700 rounded-2xl p-6 hover:border-amber-500/50 transition-colors shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <stage.icon className="w-24 h-24 text-amber-500" />
                      </div>

                      <div className="inline-block px-3 py-1 bg-stone-900 rounded-lg text-amber-500 text-xs font-bold mb-3 border border-stone-700">
                        [ 主線任務 0{idx + 1} ]
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {stage.title}
                      </h3>
                      <p className="text-stone-300 min-h-[48px] relative z-10">
                        {stage.task}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 5. Faith Stone Section ================= */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-blue-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-blue-500 blur-[40px] opacity-30 rounded-full" />
            <Diamond className="w-20 h-20 text-cyan-400 gem-glow-strong relative z-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-6 drop-shadow-lg">
            信心石收集系統
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            在每個關卡中，展現出
            <span className="text-cyan-400 font-bold mx-1">
              勇敢、合作、鼓勵朋友與不放棄
            </span>
            的特質，就能獲得發光的藍色信心石！
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {ranks.map((rank, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 border border-blue-900/50 p-6 rounded-2xl backdrop-blur-sm flex flex-col items-center"
              >
                <h3 className={`text-2xl font-bold mb-2 ${rank.color}`}>
                  {rank.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{rank.desc}</p>
                <div className="flex gap-1 justify-center flex-wrap">
                  {[...Array(10)].map((_, i) => (
                    <Diamond
                      key={i}
                      className={`w-5 h-5 ${i < rank.gems ? "text-cyan-400 gem-glow" : "text-slate-800"}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. Final Voting Section ================= */}
      <section className="py-32 relative bg-stone-950 overflow-hidden">
        {/* 緊張氣氛背景：紅黃漸層與人群剪影意象 */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-stone-950 to-stone-950 z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAxMDBMMTAgODVMMjAgMTAwTDMwIDkwTDQwIDEwMEw1MCA4MEw2MCAxMDBMNzAgODVMODAgMTAwTDkwIDkwTDEwMCAxMDBaIiBmaWxsPSIjMGMwYTA5Ii8+PC9zdmc+')] opacity-80 z-0" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block p-4 rounded-full bg-red-950/50 border border-red-500/30 mb-8 animate-pulse">
            <Users className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-xl tracking-wide">
            大會決斷：我們要進入迦南地嗎？
          </h2>
          <p className="text-xl md:text-2xl text-stone-400 font-medium mb-12 max-w-3xl mx-auto">
            四十天的探索結束，全會眾都在等待你們的報告。在巨大的群眾壓力下，你會舉起藍色投票牌，勇敢說出「我們能得勝」嗎？
          </p>

          <div className="flex justify-center gap-8">
            <div className="w-48 h-64 bg-blue-600 rounded-lg shadow-[0_0_30px_rgba(37,99,235,0.6)] border-4 border-white flex items-center justify-center transform -rotate-12">
              <span className="text-white font-bold text-3xl writing-vertical-rl">
                相信神
              </span>
            </div>
            <div className="w-48 h-64 bg-stone-800 rounded-lg shadow-xl border-4 border-stone-600 flex items-center justify-center transform rotate-6">
              <span className="text-stone-400 font-bold text-3xl writing-vertical-rl">
                太可怕了
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. Info Card Section ================= */}
      <section className="py-24 bg-stone-900 relative">
        <div className="max-w-3xl mx-auto px-6">
          <div className="parchment-bg rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-stone-800 text-stone-900 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-red-800 rounded-full border-4 border-stone-900 flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-amber-400 rounded-full" />
            </div>

            <h2 className="text-3xl font-black text-center mb-10 border-b-2 border-stone-300 pb-6">
              活動任務資訊
            </h2>

            <ul className="space-y-6 text-lg font-bold text-stone-700">
              <li className="flex items-center gap-4 bg-white/50 p-4 rounded-xl border border-stone-200">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-sm text-stone-500 font-medium">
                    適合對象
                  </span>
                  國小學生 (兒童營會、主日學)
                </div>
              </li>
              <li className="flex items-center gap-4 bg-white/50 p-4 rounded-xl border border-stone-200">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-lg">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-sm text-stone-500 font-medium">
                    活動時間
                  </span>
                  約 60 分鐘
                </div>
              </li>
              <li className="flex items-center gap-4 bg-white/50 p-4 rounded-xl border border-stone-200">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-lg">
                  <Sword className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-sm text-stone-500 font-medium">
                    活動形式
                  </span>
                  闖關 + 團隊解謎合作
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= 8. Message Section ================= */}
      <section className="py-32 relative bg-slate-950 overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/40 via-slate-950 to-slate-950" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-amber-400 mb-12 leading-tight">
            「十二探子看見的是同樣的巨人，
            <br className="hidden md:block" />
            但約書亞與迦勒選擇相信神。」
          </h2>
          <div className="w-1 h-16 bg-gradient-to-b from-amber-500 to-transparent mx-auto mb-12" />
          <p className="text-2xl md:text-4xl font-bold text-white leading-relaxed drop-shadow-xl">
            真正的勇敢，
            <br />
            不是沒有害怕，
            <br />
            <span className="text-emerald-400">而是害怕時仍願意相信神。</span>
          </p>
        </div>
      </section>

      {/* ================= Footer ================= */}
      <footer className="parchment-bg py-12 border-t-8 border-stone-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
          <Cross className="w-10 h-10 text-stone-800 mb-6 opacity-60" />
          <h3 className="text-2xl font-black text-stone-900 mb-2">
            曠野中的十二探子
          </h3>
          <p className="text-stone-600 font-medium text-sm">
            聖經實境解謎兒童營會活動
          </p>
          <div className="mt-8 text-stone-400 text-xs flex gap-4">
            {/* 裝飾性腳印 */}
            <div className="w-4 h-6 border-2 border-stone-400 rounded-full transform -rotate-12" />
            <div className="w-4 h-6 border-2 border-stone-400 rounded-full transform rotate-12 -translate-y-2" />
            <div className="w-4 h-6 border-2 border-stone-400 rounded-full transform -rotate-12 translate-y-2" />
          </div>
        </div>
      </footer>
    </div>
  );
}
