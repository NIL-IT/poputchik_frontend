import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyPayment } from "../api/payment";

const Success = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const orderId = searchParams.get("orderId");
  console.log(paymentId, orderId);

  useEffect(() => {
    const form = { paymentId, orderId };
    verifyPayment(form);
  }, []);

  return <div>⏳ Проверяем оплату...</div>;
};

export default Success;
