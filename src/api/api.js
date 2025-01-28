import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserStore } from "../state/UserStore";

export const API_KEY = "6339ca58-3537-4f94-b069-a82968dfb362";

const url = "https://testingnil8.ru/api";

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

async function getTripsList(city) {
  return axios.get(`${url}/trips/city_from/${city}`);
}

export function useTripsList(city) {
  const { data } = useQuery({
    queryKey: ["tripsList", city],
    queryFn: () => getTripsList(city),
    select: (data) => data?.data || [],
  });
  return data;
}
export async function createTripByDriver(data) {
  const response = await axios({
    method: "post",
    url: `${url}/trips/`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
}

async function getActiveDrviersTrips(id, state) {
  return axios.get(`${url}/trips/driver/${id}?trip_status=${state}`);
}
export function useDriversTripsList(id, state) {
  const { data } = useQuery({
    queryKey: ["tripsList"],
    queryFn: () => getActiveDrviersTrips(id, state),
    select: (data) => data.data,
  });
  return data;
}

export async function bookedTripByPassenger(passenger_id, trip_id, seats_to_book) {
  const response = await axios({
    method: "post",
    url: `${url}/trips/booking?passenger_id=${passenger_id}&trip_id=${trip_id}&seats_to_book=${seats_to_book}`,
    // data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
}
