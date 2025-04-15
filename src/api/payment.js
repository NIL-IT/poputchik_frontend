import axios from "axios";

export async function payment(data) {
  const response = await axios({
    method: "post",
    url: `https://securepay.tinkoff.ru/v2/InitPayments`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
}
export async function getStatus() {
  return axios.get("https://rest-api-test.tinkoff.ru/v2/TinkoffPay/terminals/1743154896913DEMO/status");
  // return axios.get(`https://securepay.tinkoff.ru/v2/TinkoffPay/terminals/1743154896913DEMO/status`);
}
