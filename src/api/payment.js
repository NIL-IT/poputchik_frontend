import axios from "axios";

export async function payment(data) {
  const response = await axios({
    method: "post",
    url: `https://rest-api-test.tinkoff.ru/v2/InitPayments`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
}
