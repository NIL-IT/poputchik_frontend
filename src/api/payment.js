import axios from "axios";

export async function payment(amount) {
  const response = await axios({
    method: "post",
    url: `/users/payment?amount=${amount}`,
  });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
}
export async function getStatus() {
  // return axios.get("https://rest-api-test.tinkoff.ru/v2/TinkoffPay/terminals/1743154896934/status");
  return axios.get(`https://securepay.tinkoff.ru/v2/TinkoffPay/terminals/1743154896934/status`);
}
