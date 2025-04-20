import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/NavigationButton/components/BackButton/BackButton";
import Button from "../components/Button/Button";
import { createPayout } from "../api/payment";
import { useUserStore } from "../state/UserStore";
import { validateCardNumber } from "../utils/validation";
import ReactInputMask from "react-input-mask";

export default function PaymentPage() {
  const { currentUser } = useUserStore();
  const [amount, setAmount] = useState();
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleCreatePayout() {
    setError(null);

    if (amount <= 0) {
      setError("Введите корректную сумму больше нуля.");
      return;
    }
    if (!validateCardNumber(cardNumber)) {
      setError("Номер карты введён некорректно.");
      return;
    }
    if (amount > currentUser.driver_profile.balance) {
      setError("Ваш баланс меньше введенной суммы.");
      return;
    }

    await createPayout(currentUser.driver_profile.id, amount, cardNumber);
  }
  return (
    <div className='py-10 relative flex flex-col items-center justify-between w-full min-h-screen'>
      <div className='flex flex-col'>
        <BackButton onClick={() => navigate(-1)} />
        <h3 className='font-bold text-[20px] leading-5 pb-10'>Вывод средств</h3>
        <div className='payform-tbank flex flex-col gap-5 w-full justify-center items-center'>
          <input
            className='input'
            type='number'
            placeholder='Сумма вывода'
            onChange={(e) => setAmount(+e.target.value)}
            value={amount}
          />

          <ReactInputMask
            mask='9999 9999 9999 9999'
            maskChar={null}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}>
            {(inputProps) => (
              <input
                {...inputProps}
                className='input'
                placeholder='Номер карты'
              />
            )}
          </ReactInputMask>
          {error && <p className='text-red-600'>{error}</p>}
          <Button
            type='button'
            disabled={amount <= 0 || cardNumber.length === 0}
            onClick={handleCreatePayout}
            size='large'>
            Запросить выплату
          </Button>
        </div>
      </div>
    </div>
  );
}
