import axios from "axios";
import { url } from "./api";
import { useQuery } from "@tanstack/react-query";

export async function getTripsList(city) {
  return axios.get(`${url}/trips/city_from/${city}`);
}

export function useTripsList(city) {
  const { data } = useQuery({
    queryKey: ["tripsList", city],
    queryFn: () => getTripsList(city),
    enabled: !!city,
    refetchInterval: 30_000,
    select: (data) => data?.data || [],
  });
  return data;
}

export async function getTripsListByPassenger(city) {
  return axios.get(`${url}/trips/driver/city_from/${city}`);
}

export function useTripsListByPassenger(city) {
  const { data } = useQuery({
    queryKey: ["tripsListByPass", city],
    queryFn: () => getTripsListByPassenger(city),
    enabled: !!city,
    refetchInterval: 30_000,
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
export async function createTripByPassenger(data) {
  const response = await axios({
    method: "post",
    url: `${url}/trips/passenger`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
}
export async function getDrviersTrips(id, state) {
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
    enabled: !!id,
    refetchInterval: 30_000,
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

export async function bookedTripByDriver(driver_id, trip_id) {
  const response = await axios({
    method: "post",
    url: `${url}/trips/booking_driver?driver_id=${driver_id}&trip_id=${trip_id}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
}

export async function getPassengerTrips(id, state) {
  return axios.get(`${url}/trips/passenger/${id}?trip_status=${state}`);
}
export function usePassengerTripsList(id, state) {
  const { data } = useQuery({
    queryKey: ["tripsList"],
    queryFn: () => getPassengerTrips(id, state),
    enabled: !!id,
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

export async function getTripsById(trip_id) {
  return axios.get(`${url}/trips/${trip_id}`);
}

export function useTripById(tripId) {
  const { data } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => getTripsById(tripId),
    select: (data) => data.data,
  });
  return data;
}

export async function tripRequestByPassenger(data) {
  const response = await axios({
    method: "post",
    url: `${url}/trip_requests/trip_requests/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
}
export async function getRequestsByDriverId(driver_id) {
  if (driver_id !== null) return axios.get(`${url}/trip_requests/trip_requests/driver/${driver_id}`);
}

export function useRequests(driver_id) {
  const { data } = useQuery({
    queryKey: ["requests", driver_id],
    queryFn: () => getRequestsByDriverId(driver_id),
    enabled: !!driver_id,
    refetchInterval: 30_000,
    select: (data) => data.data,
  });
  return data;
}

export async function approveRequest(request_id) {
  const response = await axios({
    method: "put",
    url: `${url}/trip_requests/trip_requests/${request_id}/approve`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw new Error(response.data);
  }
}
export async function rejectRequest(request_id) {
  const response = await axios({
    method: "put",
    url: `${url}/trip_requests/trip_requests/${request_id}/reject`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw new Error(response.data);
  }
}
