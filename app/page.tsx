import Link from "next/link";

const features = [
  {
    title: "自訂職缺與題數",
    desc: "貼上職缺描述，自由設定 1–10 題，練習最符合你應徵情境的題目。",
  },
  {
    title: "情境式動態出題",
    desc: "AI 根據職缺內容與你的回答，提出相關且不重複的追問，更貼近真實面試。",
  },
  {
    title: "即時講評",
    desc: "每題回答後立即獲得具體講評，點出優點與待改進之處。",
  },
  {
    title: "參考正解",
    desc: "針對每題提供更完整、理想的範例回答，幫你建立答題架構感。",
  },
  {
    title: "表達方式建議",
    desc: "教你如何用更有效的方式表達同樣內容，例如 STAR 法則、量化成果。",
  },
  {
    title: "總結評分",
    desc: "完成所有題目後，取得整體評分與可執行的改進建議。",
  },
];

const steps = [
  { title: "輸入職缺與題數", desc: "貼上職缺描述，設定想練習的題目數量。" },
  { title: "逐題回答", desc: "AI 面試官即時出題，回答後立即取得正解與表達建議。" },
  { title: "取得總評", desc: "完成所有題目後，獲得整體評分與改進方向。" },
];

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white">
      <path
        d="M12 2L9.5 9.5L2 12L9.5 14.5L12 22L14.5 14.5L22 12L14.5 9.5L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-zinc-950 font-sans text-zinc-100">
      {/* tech grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent 70%)",
        }}
      />
      {/* glow orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute top-72 -right-20 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute top-[1500px] left-1/3 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl sm:h-72 sm:w-72" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-bold text-white">
              AI
            </span>
            <span className="text-sm font-semibold text-zinc-50">面試模擬器</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#features" className="transition-colors hover:text-white">
              功能
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-white">
              使用方式
            </a>
            <Link href="/settings" className="transition-colors hover:text-white">
              設定 API Key
            </Link>
          </nav>
          <Link
            href="/interview"
            className="rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition-opacity hover:opacity-90"
          >
            開始使用
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="flex flex-col items-center gap-6 px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-24 sm:pb-24">
          <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 font-mono text-xs font-medium tracking-wide text-indigo-300">
            AI 面試教練 · 即時回饋
          </span>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
            用{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              AI 面試官
            </span>
            ，
            <br />
            練到你真正準備好
          </h1>
          <p className="max-w-xl text-base text-zinc-400 sm:text-lg">
            貼上職缺描述，設定想練習的題數，立即展開一對一模擬面試。
            每題都有即時講評、參考正解，以及更好的表達方式建議。
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/interview"
              className="rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition-opacity hover:opacity-90"
            >
              免費開始模擬面試
            </Link>
            <a
              href="#features"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5"
            >
              了解功能
            </a>
          </div>
          <p className="font-mono text-xs text-zinc-500">
            BYOK 架構 · 金鑰只存在你的瀏覽器 · Powered by OpenAI
          </p>

          {/* Mock preview card */}
          <div className="mt-6 w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-zinc-500">模擬面試中</span>
            </div>
            <div className="flex flex-col gap-2 pt-3 text-sm">
              <div className="self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-zinc-200">
                請分享一個你解決過的技術挑戰。
              </div>
              <div className="self-end rounded-2xl rounded-br-sm bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-2 text-white">
                我曾優化了一個效能瓶頸⋯
              </div>
              <div className="rounded-lg border-l-2 border-emerald-400 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
                參考正解：建議用情境、行動、量化成果來組織回答
              </div>
              <div className="rounded-lg border-l-2 border-sky-400 bg-sky-500/10 px-3 py-2 text-xs text-sky-300">
                表達建議：用 STAR 法則重新組織，結尾補上量化成果
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-4 py-16 sm:px-6 sm:py-20 md:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-12">
              <h2 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
                完整的面試練習功能
              </h2>
              <p className="max-w-lg text-sm text-zinc-400">
                不只是出題機器人，而是能給你具體、可執行回饋的練習教練。
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-indigo-400/40 hover:bg-white/[0.06]"
                >
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
                    <SparkIcon />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-zinc-50">
                    {f.title}
                  </h3>
                  <p className="text-sm text-zinc-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback showcase */}
        <section className="px-4 py-16 sm:px-6 sm:py-20 md:px-10">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
                每一題，都給你具體可執行的回饋
              </h2>
              <p className="text-sm text-zinc-400 sm:text-base">
                不只是出題，AI 面試官會告訴你哪裡可以更好——提供理想範例答案，
                以及如何用更有說服力的方式表達同樣的經驗。
              </p>
              <ul className="flex flex-col gap-3 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  講評點出回答的優點與不足
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  參考正解示範更完整的答題架構
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-400" />
                  表達建議教你用更好的方式說出同樣內容
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
              <span className="font-mono text-xs text-indigo-400">回答講評</span>
              <p className="mt-2 text-sm text-zinc-300">
                回答有提到具體情境，但結果的量化數據略少。
              </p>
              <div className="mt-3 flex flex-col gap-1 rounded-xl border-l-2 border-emerald-400 bg-emerald-500/10 p-3">
                <span className="text-xs font-semibold text-emerald-300">參考正解</span>
                <p className="text-sm text-zinc-200">
                  說明當時面臨的情境與限制 → 採取的具體行動 → 最終可量化的成果。
                </p>
              </div>
              <div className="mt-3 flex flex-col gap-1 rounded-xl border-l-2 border-sky-400 bg-sky-500/10 p-3">
                <span className="text-xs font-semibold text-sky-300">更好的表達方式</span>
                <p className="text-sm text-zinc-200">
                  用 STAR 法則重新組織回答，並在結尾加上一句量化成果。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-4 py-16 sm:px-6 sm:py-20 md:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-12">
              <h2 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
                三步驟開始練習
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {steps.map((s, i) => (
                <div key={s.title} className="flex flex-col items-center gap-3 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-semibold text-zinc-50">{s.title}</h3>
                  <p className="text-sm text-zinc-400">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BYOK security strip */}
        <section className="px-4 sm:px-6 md:px-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-zinc-300">
              <span className="font-semibold text-zinc-50">BYOK 架構：</span>
              使用你自己的 OpenAI API Key，金鑰只存在瀏覽器，我們的伺服器不會保存。
            </p>
            <Link
              href="/settings"
              className="shrink-0 text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              前往設定 →
            </Link>
          </div>
        </section>

        {/* CTA banner */}
        <section className="px-4 py-16 sm:px-6 sm:py-20 md:px-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-12 text-center shadow-[0_0_80px_-20px_rgba(129,88,249,0.6)] sm:px-8 sm:py-14">
            <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
              準備好了嗎？
            </h2>
            <p className="max-w-md text-sm text-white/90">
              開始你的第一場模擬面試，完全免費，隨時可以重新練習。
            </p>
            <Link
              href="/interview"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 shadow-lg transition-opacity hover:opacity-90"
            >
              立即開始模擬面試
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-4 py-10 sm:px-6 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-xs font-bold text-white">
                AI
              </span>
              <span className="text-sm font-medium text-zinc-200">面試模擬器</span>
            </div>
            <p className="max-w-xs text-xs text-zinc-500">
              用 AI 面試官幫你練到真正準備好，每題都有具體回饋。
            </p>
          </div>
          <div className="flex gap-8 text-sm text-zinc-400">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-zinc-500">產品</span>
              <a href="#features" className="hover:text-white">功能</a>
              <a href="#how-it-works" className="hover:text-white">使用方式</a>
              <Link href="/settings" className="hover:text-white">設定 API Key</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-zinc-500">開始</span>
              <Link href="/interview" className="hover:text-white">模擬面試</Link>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-5xl text-xs text-zinc-500">
          © 2026 AI 面試模擬器. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
