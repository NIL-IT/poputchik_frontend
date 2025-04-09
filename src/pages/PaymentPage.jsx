import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/NavigationButton/components/BackButton/BackButton";
import Button from "../components/Button/Button";
import { useUserStore } from "../state/UserStore";
import { getStatus, payment } from "../api/payment";

export default function PaymentPage() {
  const terminalkey = "1743154896913DEMO";
  const password = "5agKh^xldCr9okSw";
  const [summ, setSumm] = useState("");
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   getStatus();
  //   if (window.pay) {
  //     window.pay(event.target);
  //   } else {
  //     console.error("Скрипт оплаты не загружен");
  //   }
  // };
  async function pay(e) {
    e.preventDefault();
    const form = {
      TerminalKey: terminalkey,
      paymentInfo: {
        PaymentData: {
          TerminalKey: terminalkey,
          Amount: summ * 100,
        },
      },
    };
    console.log("first");
    try {
      await getStatus();
      await payment(form);
    } catch (error) {
      console.log(error.message || "Неизвестная ошибка");
    }
  }
  return (
    <div className='py-10 relative flex flex-col items-center justify-between w-full min-h-screen'>
      <div className='flex flex-col'>
        <BackButton onClick={() => navigate(-1)} />
        <h3 className='font-bold text-[20px] leading-5 pb-10'>Вывод средств</h3>
        <form
          ref={formRef}
          className='payform-tbank flex flex-col gap-5 w-full justify-center items-center'
          name='payform-tbank'
          onSubmit={pay}>
          <input
            className='payform-tbank-row input'
            type='hidden'
            name='terminalkey'
            value={terminalkey}
          />
          <input
            className='payform-tbank-row input'
            type='hidden'
            name='frame'
            value='false'
          />
          <input
            className='payform-tbank-row input'
            type='hidden'
            name='language'
            value='ru'
          />
          <input
            className='payform-tbank-row input'
            type='text'
            placeholder='Сумма заказа'
            name='amount'
            required
          />
          <input
            className='payform-tbank-row input'
            type='hidden'
            placeholder='Номер заказа'
            name='order'
          />
          <input
            className='payform-tbank-row input'
            type='hidden'
            placeholder='Описание заказа input'
            name='description'
          />
          <input
            className='payform-tbank-row input'
            type='hidden'
            placeholder='ФИО плательщика input'
            name='name'
          />
          <input
            className='payform-tbank-row input'
            type='hidden'
            placeholder='E-mail'
            name='email'
          />
          <input
            className='payform-tbank-row input'
            type='hidden'
            placeholder='Контактный телефон'
            name='phone'
          />

          <Button
            type='submit'
            className='payform-tbank-btn'
            size='large'>
            Оплатить
          </Button>
        </form>
      </div>
    </div>
  );
}
