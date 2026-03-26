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
    const res = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input }),
    });
    const data = await res.json();
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    await fetch('http://localhost:3000/documents/upload', {
      method: 'POST',
      body: formData,
    });
  };
}
