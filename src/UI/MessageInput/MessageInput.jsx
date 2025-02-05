import Input from "../Input/Input";

export default function MessageInput({ input, setInput, sendMessage }) {
  return (
    <div className='p-4 w-full border-t flex bg-[#F9F9F9] justify-center '>
      <Input
        className='bg-[#FEFEFE] w-[350px] h-[38px] p-2'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Сообщение'
      />
      <button
        className='ml-2 bg-orange-500 text-white px-4 py-2 rounded-lg'
        onClick={sendMessage}>
        ➤
      </button>
    </div>
  );
}
