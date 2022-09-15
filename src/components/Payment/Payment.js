import { useLocation } from "react-router-dom";
import { ContactInfoForm } from "../ContactInfoForm";

export const Payment = () => {
  const { state } = useLocation();
  const { checkIn, checkOut, bookingDates, roomCapacity } = state?.props || '';

  const bookingInfo = {
    checkIn: checkIn,
    checkOut: checkOut,
    roomCapacity: roomCapacity,
    bookingDates: bookingDates,
  };

  return (
    <div>
      <ContactInfoForm props={bookingInfo} />
    </div>
  )
}