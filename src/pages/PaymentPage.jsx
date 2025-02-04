import { useNavigate } from "react-router-dom";
import BackButton from "../UI/BackButton";
import Input from "../UI/Input/Input";

export default function PaymentPage() {
  const navigate = useNavigate();
  return (
    <div className='pt-10 relative flex flex-col items-center jc w-full min-h-screen'>
      <div className='flex flex-col'>
        <BackButton onClick={() => navigate(-1)} />
        <h3 className='font-bold text-[20px] leading-5 pb-10'>Вывод средств</h3>
        <div className='flex flex-col gap-5 w-full justify-center items-center'>
          <Input placeholder={"ФИО"} />
          <Input placeholder={"Номер карты"} />
          <Input placeholder={"Сумма вывода"} />
        </div>
      </div>
    </div>
  );
}
