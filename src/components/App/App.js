import { Route, Routes } from "react-router-dom";
import { Accommodation, Activities, Contact, Dining, Home, Payment, SuccessBooking } from '../../components';

//exporting from here (instead of export default at the bottom of the file)
//means destructuring when importing as in index.js
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/accommodation" element={<Accommodation />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/dining" element={<Dining />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/success" element={<SuccessBooking />} />
   </Routes>
  );
};
