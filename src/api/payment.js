import axios from "axios";
import { url } from "./api";

export async function payment(amount, passenger_id, driver_id, trip_id) {
  return axios.get(
    `${url}/users/payment?amount=${amount}&passenger_id=${passenger_id}&driver_id=${driver_id}&trip_id=${trip_id}`,
  );
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

export async function createPayout(driver_id, amount, cardNumber) {
  const response = await axios({
    method: "post",
    url: `${url}/users/payout?driver_id=${driver_id}&amount=${amount}&card_number=${cardNumber}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}
