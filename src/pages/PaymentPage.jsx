import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/NavigationButton/components/BackButton/BackButton";
import Button from "../components/Button/Button";
import { useUserStore } from "../state/UserStore";

export default function PaymentPage() {
  const terminalkey = "1743154896913DEMO";
  const [summ, setSumm] = useState("");
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://securepay.tinkoff.ru/html/payForm/js/tinkoff.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.pay) {
      window.pay(formRef.current);
    } else {
      console.error("Функция pay не загружена");
    }
  };

  return (
    <div className='py-10 relative flex flex-col items-center justify-between w-full min-h-screen'>
      <div className='flex flex-col'>
        <BackButton onClick={() => navigate(-1)} />
        <h3 className='font-bold text-[20px] leading-5 pb-10'>Вывод средств</h3>
        <form
          ref={formRef}
          className='flex flex-col gap-5 w-full justify-center items-center'
          name='TinkoffPayForm'
          onSubmit={handleSubmit}>
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
            placeholder='Сумма вывода'
            value={summ}
            onChange={(e) => setSumm(e.target.value)}
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
            value={currentUser.email}
            name='email'
          />
          <input
            className='tinkoffPayRow input'
            type='hidden'
            placeholder='Контактный телефон'
            value={currentUser.phone_number}
            name='phone'
          />
          {/* <input
            className='tinkoffPayRow'
            type='hidden'
            name='receipt'
            value=''
          /> */}
          <input
            className='tinkoffPayRow input'
            type='submit'
            value='Оплатить'
          />
        </form>
        <Button size='large'>Вывести</Button>
      </div>
    </div>
  );
}
