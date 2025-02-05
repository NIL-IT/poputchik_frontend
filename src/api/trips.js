import axios from "axios";
import { url } from "./api";
import { useQuery } from "@tanstack/react-query";

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
  try {
    const response = await axios.get(`${url}/trips/driver/${id}?trip_status=${state}`);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { data: [] };
    }

    throw error;
  }
}

export function useDriversTripsList(id, state) {
  const { data } = useQuery({
    queryKey: ["tripsList", id, state],
    queryFn: () => getDrviersTrips(id, state),
    select: (data) => data.data,
  });
  return data;
}

export async function bookedTripByPassenger(passenger_id, trip_id, seats_to_book) {
  const response = await axios({
    method: "post",
    url: `${url}/trips/booking?passenger_id=${passenger_id}&trip_id=${trip_id}&seats_to_book=${seats_to_book}`,
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

export async function updateTripState(trip_id, state) {
  const response = await axios({
    method: "put",
    url: `${url}/tripschange_state/${trip_id}?state=${state}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw new Error(response.data);
  }
}
