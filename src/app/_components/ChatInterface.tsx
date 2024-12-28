"use client";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatInterface = () => {
  const [url, setUrl] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUrlSubmit = async () => {
    setIsProcessing(true);
    // Here you would call your tRPC mutation to process the URL
    // const result = await api.docs.processUrl.mutate({ url });
    setIsProcessing(false);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Here you would call your tRPC mutation to get the AI response
    // const response = await api.chat.sendMessage.mutate({ message: input });
    // setMessages(prev => [...prev, { role: "assistant", content: response }]);
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-white/10 p-6">
      {messages.length === 0 ? (
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">
            Enter documentation URL to begin
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://docs.example.com"
              className="flex-1 rounded-full bg-white/5 px-4 py-2 text-white"
            />
            <button
              onClick={handleUrlSubmit}
              disabled={isProcessing}
              className="rounded-full bg-white/10 px-6 py-2 font-semibold transition hover:bg-white/20"
            >
              {isProcessing ? "Processing..." : "Start Chat"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-[600px] flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user" ? "bg-purple-500" : "bg-white/10"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask a question about the documentation..."
              className="flex-1 rounded-full bg-white/5 px-4 py-2 text-white"
            />
            <button
              onClick={handleSendMessage}
              className="rounded-full bg-white/10 px-6 py-2 font-semibold transition hover:bg-white/20"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
