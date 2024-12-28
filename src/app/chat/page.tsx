import { type FC } from "react";
import ChatInterface from "~/app/_components/ChatInterface";

const ChatPage: FC = () => {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
        <h1 className="text-center text-4xl font-bold">Ask The Docs</h1>
        <ChatInterface />
      </div>
    </main>
  );
};

export default ChatPage;
