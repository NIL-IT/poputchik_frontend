import { useNavigate } from "react-router-dom";
import BackButton from "../UI/BackButton";
import Input from "../UI/Input/Input";
import { useState } from "react";
import Button from "../UI/Button/Button";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [summ, setSumm] = useState("");

  return (
    <div className='py-10 relative flex flex-col items-center justify-between w-full min-h-screen'>
      <div className='flex flex-col'>
        <BackButton onClick={() => navigate(-1)} />
        <h3 className='font-bold text-[20px] leading-5 pb-10'>Вывод средств</h3>
        <div className='flex flex-col gap-5 w-full justify-center items-center'>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"ФИО"}
          />
          <Input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder={"Номер карты"}
          />
          <Input
            value={summ}
            onChange={(e) => setSumm(e.target.value)}
            placeholder={"Сумма вывода"}
          />
        </div>
      </div>
      <Button size={"large"}>Вывести</Button>
    </div>
  );
}
