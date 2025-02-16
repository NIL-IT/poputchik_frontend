import Profile from "../UI/Profile/Profile";
import HistoryCard from "../UI/HistoryCard/HistoryCard";

export const renderWaitingItems = (waitingList) => {
  if (!waitingList || waitingList.length === 0) return [];
  return waitingList
    .filter((i) => i.status === "pending")
    .map((request) => (
      <Profile
        key={`waiting-${request.id}`}
        drive={request.trip}
        passenger={request.passenger.user}
        pending
        request={request}
      />
    ));
};

export const renderMainList = (list, isDriver) => {
  if (!list || list.length === 0) return [];

  if (isDriver) {
    const passengerList = list
      .map((item) =>
        item.booked_trips
          ? item.booked_trips.slice(0, 2).map((trip) => (
              <Profile
                key={trip.id}
                drive={trip}
                passenger={item.user}
              />
            ))
          : null,
      )
      .filter(Boolean);
    return passengerList.flat().slice(0, 2);
  } else if (!isDriver) {
    return list
      .map((obj) => (
        <Profile
          key={obj.id}
          drive={obj}
        />
      ))
      .slice(0, 2);
  }
  return [];
};

export const renderHistoryCard = (list, empytText) => {
  if (!list || list.length === 0) return [<span key='empty'>{empytText}</span>];

  return list.map((obj) => (
    <HistoryCard
      key={obj.id}
      drive={obj}
    />
  ));
};
