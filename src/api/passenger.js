import axios from "axios";
import { url } from "./api";

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
