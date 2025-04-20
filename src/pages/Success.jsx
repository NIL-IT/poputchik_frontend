import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (paymentId) {
      // вызовем бекенд для верификации
      fetch("/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId, orderId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Verify result:", data);
          // можешь показать пользователю success/error и т.п.
        });
    }
  }, [paymentId, orderId]);

  return <div>⏳ Проверяем оплату...</div>;
};

export default Success;
