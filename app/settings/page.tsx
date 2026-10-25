"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearStoredApiKey, getStoredApiKey, setStoredApiKey } from "@/lib/apiKey";

const cardClass =
  "rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60";

const primaryButtonClass =
  "h-11 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40";

const secondaryButtonClass =
  "h-11 rounded-full border border-zinc-300 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const stored = getStoredApiKey();
    setApiKey(stored);
    setSavedKey(stored);
  }, []);

  function handleSave() {
    setStoredApiKey(apiKey.trim());
    setSavedKey(apiKey.trim());
    setMessage("已儲存到瀏覽器");
  }

  function handleClear() {
    clearStoredApiKey();
    setApiKey("");
    setSavedKey("");
    setMessage("已清除");
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-bold text-white">
            AI
          </span>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            面試模擬器
          </span>
        </Link>
        <Link
          href="/interview"
          className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← 返回面試模擬器
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 pb-16">
        <div className="flex w-full max-w-xl flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              API Key 設定
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              使用你自己的 OpenAI API Key 來進行模擬面試（BYOK）
            </p>
          </div>

          <section className={`flex flex-col gap-4 ${cardClass}`}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                OpenAI API Key
              </label>
              <div className="flex gap-2">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 outline-none focus:border-indigo-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((v) => !v)}
                  className="rounded-lg border border-zinc-200 px-3 text-xs text-zinc-500 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                >
                  {showKey ? "隱藏" : "顯示"}
                </button>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                金鑰只會儲存在你瀏覽器的 localStorage，送出面試請求時會附加在
                API 呼叫中轉送給 OpenAI，我們的伺服器不會儲存這把金鑰。可以到{" "}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 underline hover:text-indigo-600"
                >
                  OpenAI API Keys
                </a>{" "}
                頁面取得。
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!apiKey.trim()}
                className={primaryButtonClass}
              >
                儲存
              </button>
              <button onClick={handleClear} className={secondaryButtonClass}>
                清除
              </button>
            </div>

            {message && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                {message}
              </p>
            )}

            <div className="border-t border-zinc-200 pt-3 text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
              目前狀態：
              {savedKey ? (
                <span className="text-emerald-600 dark:text-emerald-400">
                  {" "}
                  已設定（{savedKey.slice(0, 7)}…{savedKey.slice(-4)}）
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400"> 尚未設定</span>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="relative z-10 border-t border-zinc-200 py-6 text-center text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
        © 2026 AI 面試模擬器
      </footer>
    </div>
  );
}
