export function getStatus(state) {
  switch (state) {
    case "active":
      return "Активна";
    case "booked":
      return "Забронирована";
    case "finished":
      return "Завершена";
  }
}

export function formatDate(dateString, showTime = false) {
  const date = new Date(dateString);

  // Проверяем валидность даты
  if (isNaN(date.getTime())) {
    return "";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let formattedDate = `${day}.${month}.${year}`;

  if (showTime) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    formattedDate += ` ${hours}:${minutes}`;
  }

  return formattedDate;
}
