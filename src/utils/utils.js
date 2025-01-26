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

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
