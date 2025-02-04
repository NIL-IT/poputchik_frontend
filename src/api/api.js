import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const API_KEY = "6339ca58-3537-4f94-b069-a82968dfb362";

export const url = "https://testingnil8.ru/api";

export async function urlToFile(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  const filename = url.split("/").pop().split(/[#?]/)[0];
  return new File([blob], filename, { type: blob.type });
}
