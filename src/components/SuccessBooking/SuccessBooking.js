import { useLocation } from "react-router-dom";


export const SuccessBooking = () => {
  const { state } = useLocation();
  const { bookingId } = state?.data || '';
  console.log(state);
  return (
    <div>
      <h3>Your booking has been made!</h3>
      <p>We look forward to having you stay with us.</p>
      <h3>Your booking reference number is:</h3>
      <h1>{bookingId}</h1>
    </div>

  )
}

export default SuccessBooking;