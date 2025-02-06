import { useEffect, useState } from "react";
import Message from "../UI/Message/Message";
import MessageInput from "../UI/MessageInput/MessageInput";
import { useUserStore } from "../state/UserStore";
import { useNavigate, useParams } from "react-router-dom";
import { getPassengerById, useChatHistory } from "../api/passenger";
import CloseBtn from "../UI/CloseBtn";
import { useDriverById } from "../api/driver";
import { usePassengerById } from "../api/passenger";
import { useTripById } from "../api/trips";

const Chat = () => {
  const { currentUser, currentRole } = useUserStore();
  const navigate = useNavigate();
  const userId = currentUser.id;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const { tripId, passengerId } = useParams();
  const chatId = `${tripId}_${passengerId}`;
  const chatHistory = useChatHistory(chatId);
  const passenger = usePassengerById(passengerId);
  const trip = useTripById(tripId);
  const driverQuery = useDriverById(trip?.driver_id);
  const driver = driverQuery.data?.user;

  useEffect(() => {
    if (chatHistory) {
      setMessages(chatHistory);
    }
  }, [chatHistory]);

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

  const name = currentRole == "driver" ? passenger && passenger.name : driver && driver.name;
  console.log(name);

  return (
    <div className='flex flex-col h-screen mx-auto'>
      <CloseBtn
        className='absolute top-6  right-5 w-11 h-11 rounded-full flex justify-center items-center bg-[#fff] shadow-btnback z-10'
        onClick={() => navigate(-1)}
      />
      <div className='bg-orange-500 text-white p-8 text-[32px] leading-8 font-semibold'>{name}</div>
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
