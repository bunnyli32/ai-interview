"use client";

import Link from "next/link";
import { useState } from "react";

type QaPair = {
  question: string;
  answer: string;
  feedback: {
    comment: string;
    referenceAnswer: string;
    betterExpression: string;
  };
};

type Phase = "config" | "question" | "feedback" | "result";

type ApiResponse =
  | { phase: "question"; question: string; index: number; total: number }
  | {
      phase: "feedback";
      comment: string;
      referenceAnswer: string;
      betterExpression: string;
      isLast: boolean;
    }
  | { phase: "result"; score: number; feedback: string };

const MIN_QUESTIONS = 1;
const MAX_QUESTIONS = 10;

const cardClass =
  "rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60";

const primaryButtonClass =
  "h-11 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40";

const secondaryButtonClass =
  "h-11 rounded-full border border-zinc-300 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800";

export default function InterviewPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(3);
  const [phase, setPhase] = useState<Phase>("config");

  const [qaPairs, setQaPairs] = useState<QaPair[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [answerInput, setAnswerInput] = useState("");
  const [pendingAnswer, setPendingAnswer] = useState("");
  const [feedback, setFeedback] = useState<
    | {
        comment: string;
        referenceAnswer: string;
        betterExpression: string;
        isLast: boolean;
      }
    | null
  >(null);
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function callApi(
    action: "start" | "submit_answer" | "next_question" | "finish",
    extra: { qaPairs?: QaPair[]; currentQuestion?: string; answer?: string } = {}
  ): Promise<ApiResponse | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          totalQuestions,
          qaPairs: extra.qaPairs ?? qaPairs,
          action,
          currentQuestion: extra.currentQuestion,
          answer: extra.answer,
        }),
      });
      const data: ApiResponse | { error: string } = await res.json();

      if (!res.ok || "error" in data) {
        setError("error" in data ? data.error : "發生未知錯誤");
        return null;
      }
      return data;
    } catch {
      setError("無法連線到伺服器");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function handleStart() {
    if (!jobDescription.trim()) return;
    setQaPairs([]);
    setResult(null);
    setError(null);
    const data = await callApi("start", { qaPairs: [] });
    if (data?.phase === "question") {
      setCurrentQuestion(data.question);
      setCurrentIndex(data.index);
      setPhase("question");
    }
  }

  async function handleSubmitAnswer() {
    if (!answerInput.trim()) return;
    const answer = answerInput;
    const data = await callApi("submit_answer", { currentQuestion, answer });
    if (data?.phase === "feedback") {
      setPendingAnswer(answer);
      setFeedback(data);
      setAnswerInput("");
      setPhase("feedback");
    }
  }

  async function handleContinue() {
    if (!feedback) return;
    const newQaPairs: QaPair[] = [
      ...qaPairs,
      {
        question: currentQuestion,
        answer: pendingAnswer,
        feedback: {
          comment: feedback.comment,
          referenceAnswer: feedback.referenceAnswer,
          betterExpression: feedback.betterExpression,
        },
      },
    ];
    setQaPairs(newQaPairs);
    setFeedback(null);

    if (feedback.isLast) {
      const data = await callApi("finish", { qaPairs: newQaPairs });
      if (data?.phase === "result") {
        setResult({ score: data.score, feedback: data.feedback });
        setPhase("result");
      }
    } else {
      const data = await callApi("next_question", { qaPairs: newQaPairs });
      if (data?.phase === "question") {
        setCurrentQuestion(data.question);
        setCurrentIndex(data.index);
        setPhase("question");
      }
    }
  }

  function handleReset() {
    setPhase("config");
    setJobDescription("");
    setTotalQuestions(3);
    setQaPairs([]);
    setCurrentQuestion("");
    setAnswerInput("");
    setPendingAnswer("");
    setFeedback(null);
    setResult(null);
    setError(null);
  }

  const progressPercent =
    phase === "config" ? 0 : Math.round(((currentIndex - 1) / totalQuestions) * 100);

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
          href="/"
          className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← 返回首頁
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 pb-16">
        <div className="flex w-full max-w-2xl flex-col gap-6">
          {phase !== "config" && (
            <div className="flex flex-col gap-1.5">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                第 {currentIndex} / {totalQuestions} 題
              </span>
            </div>
          )}

          {phase === "config" && (
            <>
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  開始你的模擬面試
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  輸入職缺描述與題數，AI 面試官會立即為你出題
                </p>
              </div>
              <section className={`flex flex-col gap-4 ${cardClass}`}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    職缺描述
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="例如：前端工程師，需熟悉 React、TypeScript，負責公司電商平台開發..."
                    rows={6}
                    className="resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 outline-none focus:border-indigo-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    面試題數（{MIN_QUESTIONS}–{MAX_QUESTIONS} 題）
                  </label>
                  <input
                    type="number"
                    min={MIN_QUESTIONS}
                    max={MAX_QUESTIONS}
                    value={totalQuestions}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (Number.isNaN(v)) return;
                      setTotalQuestions(
                        Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, v))
                      );
                    }}
                    className="w-24 rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-sm text-zinc-900 outline-none focus:border-indigo-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                  />
                </div>
                <button
                  onClick={handleStart}
                  disabled={!jobDescription.trim() || loading}
                  className={`mt-1 ${primaryButtonClass}`}
                >
                  {loading ? "準備題目中…" : "開始模擬面試"}
                </button>
              </section>
            </>
          )}

          {phase === "question" && (
            <section className="flex flex-col gap-4">
              {qaPairs.length > 0 && <HistoryList qaPairs={qaPairs} />}
              <div className={`flex flex-col gap-2 ${cardClass}`}>
                <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400">
                  面試官提問
                </span>
                <p className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                  {loading && !currentQuestion ? "面試官出題中…" : currentQuestion}
                </p>
              </div>
              <div className={`flex flex-col gap-2 ${cardClass}`}>
                <textarea
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="輸入你的回答..."
                  rows={4}
                  className="resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 outline-none focus:border-indigo-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                />
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!answerInput.trim() || loading}
                  className={primaryButtonClass}
                >
                  {loading ? "送出中…" : "送出回答"}
                </button>
              </div>
            </section>
          )}

          {phase === "feedback" && feedback && (
            <section className="flex flex-col gap-4">
              <div className={`flex flex-col gap-3 ${cardClass}`}>
                <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400">
                  回答講評
                </span>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  {feedback.comment}
                </p>
                <div className="flex flex-col gap-1 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/40">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    參考正解
                  </span>
                  <p className="text-sm text-zinc-800 dark:text-zinc-200">
                    {feedback.referenceAnswer}
                  </p>
                </div>
                <div className="flex flex-col gap-1 rounded-xl bg-sky-50 p-3 dark:bg-sky-950/40">
                  <span className="text-xs font-semibold text-sky-700 dark:text-sky-400">
                    更好的表達方式
                  </span>
                  <p className="text-sm text-zinc-800 dark:text-zinc-200">
                    {feedback.betterExpression}
                  </p>
                </div>
              </div>
              <button onClick={handleContinue} disabled={loading} className={primaryButtonClass}>
                {loading ? "處理中…" : feedback.isLast ? "查看總評" : "下一題"}
              </button>
            </section>
          )}

          {phase === "result" && result && (
            <section className="flex flex-col gap-4">
              <div className={`flex flex-col gap-3 ${cardClass}`}>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  面試結果
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500">
                    {result.score}
                  </span>
                  <span className="text-sm text-zinc-500">/ 100</span>
                </div>
                <p className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
                  {result.feedback}
                </p>
              </div>
              <HistoryList qaPairs={qaPairs} />
              <button onClick={handleReset} className={secondaryButtonClass}>
                重新開始
              </button>
            </section>
          )}

          {error && <p className="text-center text-sm text-red-500">{error}</p>}
        </div>
      </main>

      <footer className="relative z-10 border-t border-zinc-200 py-6 text-center text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
        © 2026 AI 面試模擬器
      </footer>
    </div>
  );
}

function HistoryList({ qaPairs }: { qaPairs: QaPair[] }) {
  return (
    <div className="flex flex-col gap-3">
      {qaPairs.map((p, i) => (
        <details key={i} className={`text-sm ${cardClass}`}>
          <summary className="cursor-pointer font-medium text-zinc-900 dark:text-zinc-50">
            第 {i + 1} 題：{p.question}
          </summary>
          <div className="mt-3 flex flex-col gap-2">
            <p className="text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">你的回答：</span>
              {p.answer}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">{p.feedback.comment}</p>
            <div className="rounded-lg bg-emerald-50 p-2 dark:bg-emerald-950/40">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                參考正解
              </span>
              <p className="text-zinc-800 dark:text-zinc-200">
                {p.feedback.referenceAnswer}
              </p>
            </div>
            <div className="rounded-lg bg-sky-50 p-2 dark:bg-sky-950/40">
              <span className="text-xs font-semibold text-sky-700 dark:text-sky-400">
                更好的表達方式
              </span>
              <p className="text-zinc-800 dark:text-zinc-200">
                {p.feedback.betterExpression}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
