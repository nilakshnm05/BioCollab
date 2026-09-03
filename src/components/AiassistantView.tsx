import { useState } from "react";

type AiStatus = "idle" | "processing" | "streaming" | "complete" | "error";
type AiResponse = {
  answer: string;
  keyFindings: string[];
  limitations: string[];
};

const chunks = [
  "AI can",
  " help researchers",
  " identify relevant",
  " biomedical evidence.",
];

function AiassistantView() {
  const [status, setStatus] = useState<AiStatus>("idle");
  const [question, setQuestion] = useState<string>("");
  const [streamedText, setStreamedText] = useState<string>("");
  const [response, setResponse] = useState<AiResponse | null>(null);

  async function handleSubmit() {
    setStreamedText("");
    setResponse(null);
    setStatus("processing");

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("streaming");

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
    };

    setResponse(finalResponse);
    setStatus("complete");
  }

  return (
    <div>
      {status === "processing" && <p>Analysing your question...</p>}
      {status === "streaming" && <p>Generating response...</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          Enter to submit · Shift + Enter for a new line
        </p>
        <button
          type="submit"
          disabled={
            status === "processing" ||
            status === "streaming" ||
            question.trim() === ""
          }
        >
          Ask AI
        </button>
      </form>

      {status === "streaming" && (
        <>
          {streamedText}
          <span>▌</span>
        </>
      )}
      {status === "complete" && response && (
        <>
          <p>{response.answer}</p>
          <h2>Key Findings:</h2>
          <ul>
            {response.keyFindings.map((finding) => (
              <li key={finding}>{finding}</li>
            ))}
          </ul>
          <h2>Limitations:</h2>
          <ul>
            {response.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default AiassistantView;
