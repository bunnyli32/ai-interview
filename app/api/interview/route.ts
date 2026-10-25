import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const MIN_QUESTIONS = 1;
const MAX_QUESTIONS = 10;
const DEFAULT_QUESTIONS = 3;

type QaPair = {
  question: string;
  answer: string;
  feedback: {
    comment: string;
    referenceAnswer: string;
    betterExpression: string;
  };
};

type Action = "start" | "submit_answer" | "next_question" | "finish";

type RequestBody = {
  jobDescription: string;
  totalQuestions: number;
  qaPairs: QaPair[];
  action: Action;
  currentQuestion?: string;
  answer?: string;
};

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

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-openai-api-key")?.trim();

  if (!apiKey) {
    return NextResponse.json(
      { error: "請先在設定頁輸入你的 OpenAI API Key" },
      { status: 401 }
    );
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "無效的請求格式" }, { status: 400 });
  }

  const { jobDescription, action } = body;
  const qaPairs = body.qaPairs ?? [];

  if (!jobDescription?.trim()) {
    return NextResponse.json({ error: "請提供職缺描述" }, { status: 400 });
  }

  const totalQuestions = Math.min(
    MAX_QUESTIONS,
    Math.max(MIN_QUESTIONS, Math.round(body.totalQuestions) || DEFAULT_QUESTIONS)
  );

  const openai = new OpenAI({ apiKey });

  try {
    let systemPrompt: string;

    if (action === "start" || action === "next_question") {
      const historyText = qaPairs
        .map((p, i) => `第${i + 1}題：${p.question}\n使用者回答：${p.answer}`)
        .join("\n\n");
      systemPrompt = `你是一位資深技術面試官，正在針對以下職缺描述進行模擬面試：
"""
${jobDescription}
"""
面試共有 ${totalQuestions} 題，目前已完成 ${qaPairs.length} 題。
${historyText ? `已進行的問答紀錄：\n${historyText}\n` : ""}
請提出「第 ${qaPairs.length + 1} 題」面試問題，問題要具體、與職缺相關，且不要重複之前問過的題目。
請只輸出 JSON，格式為：
{"phase": "question", "question": "<繁體中文的面試問題>"}`;
    } else if (action === "submit_answer") {
      systemPrompt = `你是一位資深技術面試官，正在針對以下職缺描述進行模擬面試：
"""
${jobDescription}
"""
本題問題：${body.currentQuestion}
使用者回答：${body.answer}

請針對這個回答給出講評，內容包含：
1. comment：簡短講評（2-3句話，指出優點與不足）
2. referenceAnswer：針對此問題的「正解」，也就是一個更完整、理想的範例回答
3. betterExpression：關於「表達方式」的建議，說明使用者可以如何更有效地表達同樣的內容（例如結構、用詞、自信程度、量化成果等）

請只輸出 JSON，格式為：
{"phase": "feedback", "comment": "...", "referenceAnswer": "...", "betterExpression": "..."}`;
    } else {
      const historyText = qaPairs
        .map(
          (p, i) =>
            `第${i + 1}題：${p.question}\n使用者回答：${p.answer}\n講評：${p.feedback.comment}`
        )
        .join("\n\n");
      systemPrompt = `你是一位資深技術面試官，正在針對以下職缺描述進行模擬面試：
"""
${jobDescription}
"""
使用者已完成全部 ${totalQuestions} 題，以下是完整問答與講評紀錄：
${historyText}

請根據整場面試表現，給出總結評分與建議。
請只輸出 JSON，格式為：
{"phase": "result", "score": <0到100的整數>, "feedback": "<整體評語與改進建議，使用繁體中文，可條列>"}`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: systemPrompt }],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw);

    if (parsed.phase === "question") {
      parsed.index = qaPairs.length + 1;
      parsed.total = totalQuestions;
    } else if (parsed.phase === "feedback") {
      parsed.isLast = qaPairs.length + 1 >= totalQuestions;
    }

    return NextResponse.json(parsed as ApiResponse);
  } catch (err) {
    console.error(err);
    if (err instanceof OpenAI.APIError && err.status === 401) {
      return NextResponse.json(
        { error: "OpenAI API Key 無效，請到設定頁確認後再試一次" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "呼叫 OpenAI API 時發生錯誤" },
      { status: 500 }
    );
  }
}
