import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserStore } from "../state/UserStore";

export const API_KEY = "6339ca58-3537-4f94-b069-a82968dfb362";

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
async function getUserById(id) {
  const resp = await axios.get(`http://localhost:8082/users/${id}`);
  const setCurrentUser = useUserStore.getState().setCurrentUser;
  setCurrentUser(resp.data);
  return resp.data;
}

export function useUserById(id) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });

  return { data, isError, isLoading };
}

async function getTripsList(city) {
  return axios.get(`http://localhost:8082/trips/city_from/${city}`);
}

export function useTripsList(city) {
  const { data } = useQuery({
    queryKey: ["tripsList"],
    queryFn: () => getTripsList(city),
    select: (data) => data.data,
  });
  return data;
}
export async function createTripByDriver(data) {
  const response = await axios({
    method: "post",
    url: `http://localhost:8082/trips/`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
}
