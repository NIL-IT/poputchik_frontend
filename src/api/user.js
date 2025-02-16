import axios from "axios";
import { url } from "./api";
import { useQuery } from "@tanstack/react-query";

export async function registration(data, role) {
  const response = await axios({
    method: "post",
    url: `${url}/users/signup_${role}`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
}

export async function getUserById(id) {
  return axios.get(`${url}/users/${id}`);
}

export function useUserById(id) {
  const { data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => (id ? getUserById(id) : null),
    enabled: !!id,
    select: (data) => data.data,
  });

  return { data };
}

export async function updateUser(data) {
  const response = await axios({
    method: "put",
    url: `${url}/users/update_user`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (response.status !== 200) {
    throw new Error(response.data);
  }
}
async function getUserByUserId(user_id) {
  return axios.get(`${url}/users/users/user_id/${user_id}`);
}

export function useUserByUserId(user_id) {
  const { data } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => getUserByUserId(user_id),
    enabled: !!user_id,
    select: (data) => data.data,
  });

  return { data };
}
