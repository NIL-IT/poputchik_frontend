export function checkPaymenst(list, currentUser) {
  let isPaid = false;
  list.map((user) => {
    if (user.id === currentUser.id) {
      isPaid = true;
    }
  });
  return isPaid;
}

export function checkTripState(passengersList, passengerPayments) {
  if (passengersList.length !== passengerPayments.length) {
    return false;
  }

  const allPaid = passengerPayments.every((payment) => payment.status === "paid");

  return allPaid;
}
