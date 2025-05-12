import axios from "axios";
import { url } from "./api";
import { useQuery } from "@tanstack/react-query";

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

export async function getPassengerByDriver(driver_id) {
  return axios.get(`${url}/users/trip_passengers/${driver_id}`);
}
export function usePassengerList(driver_id) {
  const { data } = useQuery({
    queryKey: ["passengerList"],
    queryFn: () => getPassengerByDriver(driver_id),
    enabled: !!driver_id,
    select: (data) => data.data,
    refetchInterval: 30000,
  });
  return data;
}

export async function getBookedTripsByPassengerId(passenger_id) {
  return axios.get(`${url}/users/passenger/booked_trips/${passenger_id}`);
}

export function useBookedTripsList(passenger_id) {
  const { data } = useQuery({
    queryKey: ["bookedTripList", passenger_id],
    queryFn: () => getBookedTripsByPassengerId(passenger_id),
    enabled: !!passenger_id,
    refetchInterval: 30_000,
    select: (data) => data.data,
  });
  return data;
}

async function getChatHistory(chat_id) {
  return axios.get(`${url}/users/chat/history/${chat_id}`);
}
export function useChatHistory(chat_id) {
  const { data } = useQuery({
    queryKey: ["chatId", chat_id],
    queryFn: () => getChatHistory(chat_id),
    enabled: !!chat_id,
    select: (data) => data.data,
  });
  return data;
}
export async function getPassengerById(passenger_id) {
  return axios.get(`${url}/users/passenger/${passenger_id}`);
}
export function usePassengerById(passenger_id) {
  const { data } = useQuery({
    queryKey: ["chatId", passenger_id],
    queryFn: () => getPassengerById(passenger_id),
    enabled: !!passenger_id,
    select: (data) => data.data,
  });
  return data;
}
