import { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false); // Panel offen/zu
  const [messages, setMessages] = useState<Message[]>([]); // Chat-Verlauf
  const [input, setInput] = useState(''); // Eingabefeld
  const [isLoading, setIsLoading] = useState(false); // Lade-Indikator

  type Message = {
    role: 'user' | 'assistant';
    content: string;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    const res = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input }),
    });
    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: data.answer[0] },
    ]);
    setIsLoading(false);
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    await fetch('http://localhost:3000/documents/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="chat-toggle">
          Open
        </button>
      )}

      {isOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <span>Doc Assistant</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="file"
              id="file-upload"
              hidden
              accept=".pdf"
              onChange={(e) => e.target.files && uploadFile(e.target.files[0])}
            />
            <label htmlFor="file-upload">Upload File</label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about your documents..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
