export const API_KEY = "1b583848-fb5b-46a4-85ac-6dd48bbede91";
export const terminalkey = "1743154896934";

export const url = "https://testingnil8.ru/api";

export async function urlToFile(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  const filename = url.split("/").pop().split(/[#?]/)[0];
  return new File([blob], filename, { type: blob.type });
}

export function cleanAddress(address) {
  return address
    .replace(/^(Россия, )?(Республика Алтай, |Алтайский край, )?/i, "")
    .split(",")
    .map((part) => part.trim())
    .filter((part) => !/район/i.test(part))
    .join(", ");
}
