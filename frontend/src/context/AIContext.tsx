import { createContext, useContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

export type AiStatus =
  | "idle"
  | "processing"
  | "streaming"
  | "complete"
  | "error";
export type AiEvidence = {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  publicationDate: string;
  doi: string | null;
  url: string | null;
  relevance: string;
  sourceType: "paper" | "study" | "guideline";
};
export type AiResponse = {
  answer: string;
  keyFindings: string[];
  limitations: string[];
  evidence: AiEvidence[];
};
export type AiMessage =
  | {
      role: "user";
      content: string;
    }
  | {
      role: "assistant";
      content: AiResponse;
    };
type AIContextType = {
  status: AiStatus;
  setStatus: Dispatch<SetStateAction<AiStatus>>;
  question: string;
  setQuestion: Dispatch<SetStateAction<string>>;
  streamedText: string;
  setStreamedText: Dispatch<SetStateAction<string>>;
  messages: AiMessage[];
  setMessages: Dispatch<SetStateAction<AiMessage[]>>;
  handleSubmit: () => Promise<void>;
};
const AIContext = createContext<AIContextType | undefined>(undefined);

type AIProviderProps = {
  children: ReactNode;
};
export function AIProvider({ children }: AIProviderProps) {
  const [status, setStatus] = useState<AiStatus>("idle");
  const [question, setQuestion] = useState<string>("");
  const [streamedText, setStreamedText] = useState<string>("");
  const [messages, setMessages] = useState<AiMessage[]>([]);

  async function handleSubmit() {
    if (question.trim() === "") {
      return;
    }

    setStreamedText("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: question.trim() },
    ]);
    setQuestion("");
    setStatus("processing");
    const shouldFail = question.trim().toLowerCase().includes("error");
    if (shouldFail) {
      setStatus("error");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("streaming");

    const isFollowUp = messages.length > 0;
    const chunks = isFollowUp
      ? [
          "Building on our previous discussion, ",
          "AI can help members ",
          "analyze evidence more efficiently, ",
          "but the results still need verification.",
        ]
      : [
          "AI can",
          " help members",
          " identify relevant",
          " biomedical evidence.",
        ];
    let accumulatedText = "";
    for (const chunk of chunks) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      accumulatedText += chunk;
      setStreamedText(accumulatedText);
    }

    const finalResponse: AiResponse = {
      answer: accumulatedText,
      keyFindings: [
        "Improves evidence discovery",
        "Can accelerate literature synthesis",
      ],
      limitations: [
        "Evidence quality varies",
        "Human verification remains necessary",
      ],
      evidence: [
        {
          id: "evidence-001",
          title:
            "Efficacy of biologic therapies in moderate-to-severe psoriasis",
          authors: ["John Smith", "Emily Johnson", "Michael Brown"],
          journal: "Journal of Dermatological Research",
          publicationDate: "2025-06-15",
          doi: "10.1000/jdr.2025.001",
          url: "https://example.com/paper/001",
          relevance:
            "Supports the discussion of biologic therapies in psoriasis.",
          sourceType: "paper",
        },

        {
          id: "evidence-002",
          title:
            "Clinical guidelines for the management of chronic plaque psoriasis",
          authors: ["Sarah Williams", "David Anderson"],
          journal: "International Journal of Clinical Dermatology",
          publicationDate: "2024-11-20",
          url: null,
          doi: "10.1000/example",
          relevance: "Directly supports the discussion of biologic therapies.",
          sourceType: "guideline",
        },
      ],
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: finalResponse },
    ]);
    setStatus("complete");
  }

  return (
    <AIContext.Provider
      value={{
        status,
        setStatus,
        question,
        setQuestion,
        streamedText,
        setStreamedText,
        messages,
        setMessages,
        handleSubmit,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);

  if (!context) {
    throw new Error("useAI must be used within AIProvider.");
  }

  return context;
}
