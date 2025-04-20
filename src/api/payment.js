import axios from "axios";
import { url } from "./api";

export async function payment(amount, passenger_id, driver_id) {
  return axios.get(`${url}/users/payment?amount=${amount}&passenger_id=${passenger_id}&driver_id=${driver_id}`);
}
export async function getStatus() {
  return axios.get(`https://securepay.tinkoff.ru/v2/TinkoffPay/terminals/1743154896934/status`);
}

export async function verifyPayment(data) {
  const response = await axios({
    method: "post",
    url: `${url}/users/verify_payment`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}
