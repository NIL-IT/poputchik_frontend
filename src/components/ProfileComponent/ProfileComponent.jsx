import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../state/ModalStore";
import { useUserStore } from "../../state/UserStore";
import { useMap } from "../../state/MapRoutesStore";
import { useTrip } from "../../state/TripStore";
import { useDriverById } from "../../api/driver";
import { approveRequest, rejectRequest, useTripById } from "../../api/trips";
import { formatDate } from "../../utils/utils";
import { useUserByUserId } from "../../api/user";
import Profile from "./components/Profile/Profile";

export default function ProfileComponent({ drive, passenger, onList, pending, request, onChat }) {
  const { setSelectedDriver, toggleBookedModal } = useModal();
  const tripData = useTripById(drive.id);
  const navigate = useNavigate();
  const [reqStatus, setReqStatus] = useState(request ? request.status : null);
  const { currentRole, currentUser } = useUserStore();
  const { setIsRouteEnabled } = useMap();
  const { setBookedDrive } = useTrip();
  const driverData = useDriverById(drive?.driver_id)?.data;

  const [disabled, setDisabled] = useState(false);
  if (!drive) return null;

  const { start_address, end_address, departure_time, id, seats_available, is_passenger_create, driver_id } = drive;

  if (!start_address || !end_address) return null;
  if (request && reqStatus !== "pending") return null;

  const isDriver = currentRole === "driver";
  const date = formatDate(departure_time, true);
  let user;
  if (isDriver) {
    if (is_passenger_create && driver_id === null) {
      user = useUserByUserId(tripData?.passengers[0]?.user_id).data;
    } else {
      user = passenger?.user || drive?.passenger?.user || passenger;
    }
  } else {
    user = driverData?.user;
  }
  const rating = drive.driver_id ? driverData?.rating : null;

  if (!user) {
    return null;
  }
  const chooseDrive = (event) => {
    event.stopPropagation();
    if (disabled || onChat) return;
    setBookedDrive(drive);
    toggleBookedModal(true);
    setIsRouteEnabled(true);
    setDisabled(true);

    if (onList === true) navigate("/main");
  };

  const openChat = (e) => {
    e.stopPropagation();
    if (isDriver) {
      navigate(`/chat/${id}/${user.id}`);
    } else {
      navigate(`/chat/${id}/${currentUser.id}`);
    }
  };

  const openProfile = (e) => {
    e.stopPropagation();
    setSelectedDriver(user);
    navigate(`/userReview/${user.id}`);
  };

  const handleReject = (e) => {
    e.stopPropagation();
    rejectRequest(request.id);
    setReqStatus("reject");
  };

  const handleApprove = (e) => {
    e.stopPropagation();
    approveRequest(request.id);
    setReqStatus("approve");
  };

  const viewProps = {
    user,
    date,
    rating,
    start_address,
    end_address,
    seats_available,
    currentRole,
    pending,
    request,
    handlers: {
      chooseDrive,
      openChat,
      openProfile,
      handleReject,
      handleApprove,
    },
  };

  return <Profile {...viewProps} />;
}
