import { useLocation } from "react-router-dom";
import { ContactInfoForm } from "../ContactInfoForm";

export const Payment = () => {
  const { state } = useLocation();
  const { checkIn, checkOut, bookingDates } = state?.props || '';
  
  const bookingInfo = {
    checkIn: checkIn,
    checkOut: checkOut,
    bookingDates: bookingDates,
  };

  return (
    <div>
      <ContactInfoForm props={bookingInfo} />
    </div>
  )
}