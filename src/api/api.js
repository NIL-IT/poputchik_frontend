import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
export async function getDriverUser(id) {
  return axios.get(`${url}/users/driver/${id}`);
}

export function useDriverById(id) {
  const { data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => (id ? getDriverUser(id) : null),
    enabled: !!id,
    select: (data) => data.data,
  });

  return { data };
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

async function getDrviersTrips(id, state) {
  return axios.get(`${url}/trips/driver/${id}?trip_status=${state}`);
}
export function useDriversTripsList(id, state) {
  const { data } = useQuery({
    queryKey: ["tripsList"],
    queryFn: () => getDrviersTrips(id, state),
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

async function getPassengerTrips(id, state) {
  return axios.get(`${url}/trips/passenger/${id}?trip_status=${state}`);
}
export function usePassengerTripsList(id, state) {
  const { data } = useQuery({
    queryKey: ["tripsList"],
    queryFn: () => getPassengerTrips(id, state),
    select: (data) => data.data,
  });
  return data;
}

export async function createReviewByDriver(data) {
  const response = await axios({
    method: "post",
    url: `${url}/reviews/`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw new Error(response.data);
  }
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

export async function urlToFile(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  const filename = url.split("/").pop().split(/[#?]/)[0];
  return new File([blob], filename, { type: blob.type });
}

async function getPassengerByDriver(driver_id) {
  return axios.get(`${url}/users/trip_passengers/${driver_id}`);
}
export function usePassengerList(driver_id) {
  const { data } = useQuery({
    queryKey: ["passengerList"],
    queryFn: () => getPassengerByDriver(driver_id),
    select: (data) => data.data,
  });
  return data;
}

export async function getReviewsByDriverId(driver_id) {
  return axios.get(`${url}/reviews/driver/${driver_id}`);
}
