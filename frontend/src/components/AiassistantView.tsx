import { useResearch } from "@/context/ResearchContext";
import type { Research } from "@/types/research";
import { useAI } from "@/context/AIContext";
import type { AiEvidence } from "@/context/AIContext";

function AiassistantView() {
  const {
    status,
    question,
    setQuestion,
    streamedText,
    messages,
    handleSubmit,
  } = useAI();

  const { saveResearch, isResearchSaved } = useResearch();

  function convertEvidenceToResearch(evidence: AiEvidence): Research {
    return {
      id: evidence.id,
      title: evidence.title,
      authors: evidence.authors,
      journal: evidence.journal,
      publicationDate: evidence.publicationDate,
      citedByCount: 0,
      doi: evidence.doi,
      abstract: null,
      researchArea: null,
      openAccess: false,
    };
  }

  return (
    <div className="mx-auto min-h-full flex w-full max-w-4xl flex-col gap-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          AI Research Assistant
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Your AI copilot for understanding and synthesizing scientific
          evidence.
        </p>
      </header>
      {status === "processing" && (
        <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          Analysing your question...
        </div>
      )}

      {status === "streaming" && (
        <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          Generating response...
        </div>
      )}

      <div className="flex flex-col gap-4">
        {messages.map((message, index) => {
          if (message.role === "user") {
            return (
              <div
                key={index}
                className="ml-auto max-w-[80%] rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground"
              >
                {message.content}
              </div>
            );
          }
          if (message.role === "assistant") {
            return (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-sm font-semibold">BioCollab AI</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    Research Copilot
                  </span>
                </div>
                <p className="text-sm leading-6 text-foreground">
                  {message.content.answer}
                </p>
                <h2 className="mb-2 mt-5 text-sm font-semibold">
                  Key Findings:
                </h2>
                <ul className="space-y-2">
                  {message.content.keyFindings.map((finding) => (
                    <li
                      key={finding}
                      className="flex gap-2 text-sm leading-5 text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="mb-2 mt-5 text-sm font-semibold">
                  Limitations:
                </h2>
                <ul className="space-y-2">
                  {message.content.limitations.map((limitation) => (
                    <li
                      key={limitation}
                      className="flex gap-2 text-sm leading-5 text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="mb-3 mt-5 text-sm font-semibold">Evidence:</h2>
                <ul className="space-y-3">
                  {message.content.evidence.map((evidence) => {
                    const sourceUrl =
                      evidence.url ??
                      (evidence.doi ? `https://doi.org/${evidence.doi}` : null);

                    return (
                      <li
                        key={evidence.id}
                        className="rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted/40"
                      >
                        <div className="mb-2 flex items-center gap-2 text-xs">
                          <span className="font-medium uppercase tracking-wide text-primary">
                            {evidence.sourceType}
                          </span>

                          <span className="text-muted-foreground">·</span>

                          <span className="text-muted-foreground">
                            Evidence source
                          </span>
                        </div>

                        <h3 className="text-sm font-semibold leading-5">
                          {evidence.title}
                        </h3>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {evidence.authors.join(", ")}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {evidence.journal} · {evidence.publicationDate}
                        </p>

                        <p className="mt-3 text-sm leading-5 text-muted-foreground">
                          {evidence.relevance}
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                          {sourceUrl && (
                            <a
                              href={sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-primary hover:underline"
                            >
                              View Source
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const research =
                                convertEvidenceToResearch(evidence);
                              saveResearch(research);
                            }}
                            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                          >
                            {isResearchSaved(evidence.id)
                              ? "Saved ✓"
                              : "Save to Workspace"}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }
        })}
      </div>

      {status === "streaming" && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-semibold">BioCollab AI</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              Research Copilot
            </span>
          </div>

          <p className="text-sm leading-6 text-foreground">
            {streamedText}
            <span className="ml-1 animate-pulse">▌</span>
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          Something went wrong. Please try again.
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="rounded-2xl border border-border bg-card p-4 shadow-sm"
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
          className="min-h-24 w-full resize-none rounded-xl border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
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
          className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Ask AI
        </button>
      </form>
    </div>
  );
}

export default AiassistantView;
