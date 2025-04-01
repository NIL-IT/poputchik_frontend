import HistoryCard from "../components/HistoryCard/HistoryCard";
import ProfileComponent from "../components/ProfileComponent/ProfileComponent";

export const renderWaitingItems = (waitingList) => {
  if (!waitingList || waitingList.length === 0) return [];
  return waitingList
    .filter((i) => i.status === "pending")
    .map((request) => (
      <ProfileComponent
        key={`waiting-${request.id}`}
        drive={request.trip}
        passenger={request.passenger.user}
        pending
        request={request}
      />
    ));
};

export const renderMainList = (isDriver, list, onList = false, onChat = false) => {
  if (isDriver) {
    if (!list || list.length === 0) return [];
    return list.map((trip) => (
      <ProfileComponent
        key={trip.id}
        drive={trip}
        passenger={trip.passenger?.user || trip.passenger}
        onList={onList}
        onChat={onChat}
      />
    ));
  } else {
    if (!list || list.length === 0) return [];
    return list.map((obj) => (
      <ProfileComponent
        key={obj.id}
        drive={obj}
        onList={onList}
        onChat={onChat}
      />
    ));
  }
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
