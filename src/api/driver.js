import axios from "axios";
import { url } from "./api";
import { useQuery } from "@tanstack/react-query";

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

async function getReviewsByDriverId(driver_id) {
  return axios.get(`${url}/reviews/driver/${driver_id}`);
}

export function useDriverReviews(driver_id) {
  const { data } = useQuery({
    queryKey: ["userReviews", driver_id],
    queryFn: () => getReviewsByDriverId(driver_id),
    select: (data) => data.data,
  });
  return data;
}
