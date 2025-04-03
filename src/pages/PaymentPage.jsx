import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/NavigationButton/components/BackButton/BackButton";
import Button from "../components/Button/Button";
import { payment } from "../api/payment";
import { useUserStore } from "../state/UserStore";
<script src='https://securepay.tinkoff.ru/html/payForm/js/tinkoff.js'></script>;
// import Input from "../components/Input/Input";
export default function PaymentPage() {
  const terminalkey = "1743154896913DEMO";
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [summ, setSumm] = useState("");

  async function pay(e) {
    e.preventDefault();
    const form = {
      terminalkey: terminalkey,
      frame: "true",
      language: "ru",
      amount: 100 * summ,
      order: "222123",
      description: "",
      name: "",
      email: currentUser.email,
      phone: currentUser.phone_number,
    };
    console.log("first");
    await payment(form);
  }
  return (
    <div className='py-10 relative flex flex-col items-center justify-between w-full min-h-screen'>
      <div className='flex flex-col'>
        <BackButton onClick={() => navigate(-1)} />
        <h3 className='font-bold text-[20px] leading-5 pb-10'>Вывод средств</h3>
        <form
          className='flex flex-col gap-5 w-full justify-center items-center'
          name='TinkoffPayForm'>
          <input
            className='tinkoffPayRow input'
            type='hidden'
            name='terminalkey'
            value={terminalkey}
          />

          <input
            className='tinkoffPayRow input'
            type='hidden'
            name='frame'
            value='true'
          />

          <input
            className='tinkoffPayRow input'
            type='hidden'
            name='language'
            value='ru'
          />

          <input
            className='tinkoffPayRow input'
            type='text'
            value={summ}
            onChange={(e) => setSumm(e.target.value)}
            placeholder={"Сумма вывода"}
            name='amount'
            required
          />

          <input
            className='tinkoffPayRow input'
            type='hidden'
            placeholder='Номер заказа'
            name='order'
          />

          <input
            className='tinkoffPayRow input'
            type='hidden'
            placeholder='Описание заказа'
            name='description'
          />

          <input
            className='tinkoffPayRow input'
            type='text'
            placeholder='ФИО клиента'
            name='name'
          />

          <input
            className='tinkoffPayRow input'
            type='hidden'
            placeholder='E-mail'
            name='email'
          />

          <input
            className='tinkoffPayRow input'
            type='hidden'
            placeholder='Контактный телефон'
            name='phone'
          />
          <input
            className='tinkoffPayRow'
            type='hidden'
            name='receipt'
            value=''></input>
          <input
            className='tinkoffPayRow input'
            type='submit'
            value='Оплатить'
            onClick={(e) => pay(e)}
          />
        </form>
        {/* <Input
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
          /> */}
      </div>
      <Button size={"large"}>Вывести</Button>
    </div>
  );
}
