import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPayment } from "../api/payment";
import Button from "../components/Button/Button";

const Success = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const orderId = searchParams.get("orderId");

  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(true);
  const [result, setResult] = useState();

  useEffect(() => {
    if (!paymentId || !orderId) {
      return;
    }
    const checkPayment = async () => {
      const result = await verifyPayment({ paymentId, orderId });
      setResult(result);
      setisLoading(false);
    };
    checkPayment();
  }, [paymentId, orderId]);
  console.log(result);
  if (isLoading) return <div>⏳ Проверяем оплату...</div>;
  return (
    <div className='mt-10 flex flex-col justify-center items-center'>
      {result.Status === "CONFIRMED" ? (
        <div className='mb-10'>✅ Оплата успешно подтверждена!</div>
      ) : (
        <div className='mb-10'>что-то пошло не так</div>
      )}
      <Button
        onClick={() => navigate("/")}
        size={"large"}>
        На главную
      </Button>
    </div>
  );
};

export default Success;
