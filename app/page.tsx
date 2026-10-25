import Link from "next/link";

const features = [
  {
    title: "自訂職缺與題數",
    desc: "貼上職缺描述，自由設定 1–10 題，練習最符合你應徵情境的題目。",
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
  { title: "逐題回答", desc: "AI 面試官即時出題，回答後立即獲得正解與表達建議。" },
  { title: "取得總評", desc: "完成所有題目後，獲得整體評分與改進方向。" },
];

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white font-sans dark:bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute top-96 -right-32 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute top-[1400px] left-1/3 h-72 w-72 rounded-full bg-violet-400/15 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-bold text-white">
            AI
          </span>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            面試模擬器
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-zinc-600 dark:text-zinc-400 sm:flex">
          <a href="#features" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
            功能
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
            使用方式
          </a>
          <Link href="/settings" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
            設定 API Key
          </Link>
        </nav>
        <Link
          href="/interview"
          className="rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-opacity hover:opacity-90"
        >
          開始使用
        </Link>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="flex flex-col items-center gap-6 px-6 pt-16 pb-24 text-center sm:pt-24">
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400">
            AI 面試教練 · 即時回饋
          </span>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            用 AI 面試官，
            <br />
            練到你真正準備好
          </h1>
          <p className="max-w-xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
            貼上職缺描述，設定想練習的題數，立即展開一對一模擬面試。
            每題都有即時講評、參考正解，以及更好的表達方式建議。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/interview"
              className="rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-opacity hover:opacity-90"
            >
              免費開始模擬面試
            </Link>
            <a
              href="#features"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              了解功能
            </a>
          </div>

          {/* Mock preview card */}
          <div className="mt-10 w-full max-w-md rounded-2xl border border-zinc-200 bg-white/80 p-5 text-left shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-zinc-400">模擬面試中</span>
            </div>
            <div className="flex flex-col gap-2 pt-3 text-sm">
              <div className="self-start rounded-2xl rounded-bl-sm bg-zinc-100 px-3 py-2 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                請分享一個你解決過的技術挑戰。
              </div>
              <div className="self-end rounded-2xl rounded-br-sm bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-2 text-white">
                我曾優化了一個效能瓶頸⋯
              </div>
              <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                參考正解：建議用情境、行動、量化成果來組織回答
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                為什麼選擇它
              </h2>
              <p className="max-w-lg text-sm text-zinc-500 dark:text-zinc-400">
                不只是出題機器人，而是能給你具體、可執行回饋的練習教練。
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    {f.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                三步驟開始練習
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {steps.map((s, i) => (
                <div key={s.title} className="flex flex-col items-center gap-3 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    {s.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="px-6 py-10 sm:px-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-8 py-14 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
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
      <footer className="relative z-10 border-t border-zinc-200 px-6 py-10 dark:border-zinc-800 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-xs font-bold text-white">
              AI
            </span>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              面試模擬器
            </span>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © 2026 AI 面試模擬器. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
