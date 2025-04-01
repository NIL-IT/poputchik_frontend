export default function Message({ msg, userId }) {
  const isOwnMessage = msg.sender_id === userId;
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className={`${isOwnMessage ? "bg-orange-500 text-white" : "bg-gray-200"} p-4 rounded-lg max-w-xs text-left`}>
        {msg.content}
      </div>
    </div>
  );
}
