import { useEffect, useState } from "react";
import Message from "../UI/Message/Message";
import MessageInput from "../UI/MessageInput/MessageInput";
import { url } from "../api/api";
import { useUserStore } from "../state/UserStore";

const Chat = () => {
  const { currentUser } = useUserStore();
  const userId = "123";
  const chatId = "1";
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://89.23.116.157:8005/ws/chat/${chatId}`);
    ws.onopen = () => {
      console.log("Соединение установлено");
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };
    setSocket(ws);

    return () => ws.close();
  }, [chatId]);

  const sendMessage = () => {
    if (socket && input.trim()) {
      const message = { sender_id: userId, content: input };
      console.log(message);
      socket.send(JSON.stringify(message));
      setMessages((prev) => [...prev, message]);
      setInput("");
    }
  };

  return (
    <div className='flex flex-col h-screen  mx-auto'>
      <div className='bg-orange-500 text-white p-4 text-lg font-semibold'>Евгений</div>
      <div className='flex-1 overflow-y-auto p-4 space-y-2'>
        {messages.map((msg, index) => (
          <Message
            key={index}
            msg={msg}
            userId={userId}
          />
        ))}
      </div>
      <div className='w-full flex justify-center items-center'>
        <MessageInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};
export default Chat;
