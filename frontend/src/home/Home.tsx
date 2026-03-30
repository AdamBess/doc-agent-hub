export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-white/70">
      <h1 className="text-3xl font-bold text-white mb-2">Doc Agent Hub</h1>
      <p className="text-white/40 mb-12">Multi-agent document assistant</p>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-white/90 mb-4">
          How it works
        </h2>
        <div className="space-y-4 text-[15px] leading-relaxed">
          <p>
            Upload a PDF using the chat widget in the bottom-right corner. Once
            uploaded, you can ask questions about the document, request
            summaries, or retrieve the full content.
          </p>
          <p>
            Your question is analyzed by a{' '}
            <span className="text-indigo-400">Router Agent</span> that
            classifies your intent and delegates to the appropriate specialized
            agent.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-white/90 mb-4">
          Available agents
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06]">
            <h3 className="text-sm font-medium text-indigo-400 mb-1">
              Retriever
            </h3>
            <p className="text-[13px] text-white/40">
              Answers specific questions using semantic search over document
              chunks.
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06]">
            <h3 className="text-sm font-medium text-indigo-400 mb-1">
              Summarizer
            </h3>
            <p className="text-[13px] text-white/40">
              Generates a concise summary of an entire document.
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06]">
            <h3 className="text-sm font-medium text-indigo-400 mb-1">
              Document Reader
            </h3>
            <p className="text-[13px] text-white/40">
              Returns the full content of a specified document.
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06]">
            <h3 className="text-sm font-medium text-indigo-400 mb-1">
              Document Manager
            </h3>
            <p className="text-[13px] text-white/40">
              Lists all uploaded documents with metadata.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-white/90 mb-4">
          Example queries
        </h2>
        <ul className="space-y-2 text-[14px]">
          <li className="rounded-lg bg-white/[0.03] px-4 py-2 ring-1 ring-white/[0.06] text-white/50">
            "What topics does{' '}
            <span className="text-indigo-400">{'{filename}'}</span> cover?"
          </li>
          <li className="rounded-lg bg-white/[0.03] px-4 py-2 ring-1 ring-white/[0.06] text-white/50">
            "Summarize <span className="text-indigo-400">{'{filename}'}</span>"
          </li>
          <li className="rounded-lg bg-white/[0.03] px-4 py-2 ring-1 ring-white/[0.06] text-white/50">
            "Which documents do I have?"
          </li>
          <li className="rounded-lg bg-white/[0.03] px-4 py-2 ring-1 ring-white/[0.06] text-white/50">
            "Output the content of{' '}
            <span className="text-indigo-400">{'{filename}'}</span>"
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-white/90 mb-4">Tech stack</h2>
        <div className="flex flex-wrap gap-2 text-[13px]">
          {[
            'React',
            'NestJS',
            'TypeScript',
            'LangChain',
            'LangGraph',
            'OpenAI',
            'pgvector',
            'PostgreSQL',
            'MCP',
            'Tailwind CSS',
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/[0.08] text-white/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
