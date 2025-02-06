import { useEffect, useState } from "react";
import Message from "../UI/Message/Message";
import MessageInput from "../UI/MessageInput/MessageInput";
import { useUserStore } from "../state/UserStore";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { currentUser } = useUserStore();
  const userId = currentUser.id;
  const chatId = "1";
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const { tripId, passengerId } = useParams();
  console.log(tripId, passengerId);
  useEffect(() => {
    const ws = new WebSocket(`wss://testingnil8.ru/ws/chat/${tripId}/${passengerId}`);
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
