import axios from "axios";

export async function registration(data, role) {
  const response = await axios({
    method: "post",
    url: `http://localhost:8082/users/signup_${role}`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
}
