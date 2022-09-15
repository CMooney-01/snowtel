

export const findDateValues = (checkIn, checkOut, monthInfo) => {

  let checkInDate = new Date(checkIn);
  let checkOutDate = new Date(checkOut);
  // switch dates is user has selected checkOut date first
  if (checkIn > checkOut) {
    checkInDate = new Date(checkOut);
    checkOutDate = new Date(checkIn);
  }
  // need to convert ids to readable dates for user confirmation...
  const checkInDateString = checkInDate.toDateString();;
  const checkOutDateString = checkOutDate.toDateString();      

  const bookedDates = [];
  // need to figure out which nights user is staying...
  // if checkin and checkout are within same calendar month
  if (checkInDate.getMonth() === checkOutDate.getMonth()) {

    const checkInDateInt = checkInDate.getDate();
    const checkOutDateInt = checkOutDate.getDate();
    
    for (let i = checkInDateInt; i < checkOutDateInt; i++) {
      // includes night of check in, but not night of the day of check out
      bookedDates.push((new Date(checkInDate.getFullYear(), checkInDate.getMonth(), i).valueOf()));
    }
  }
  // if checkin and checkout are different calendar months...
  if (checkInDate.getMonth() !== checkOutDate.getMonth()) {
    const checkInDateInt = checkInDate.getDate();

    const checkInMonthDays = monthInfo[checkInDate.getMonth()]?.days;
    // push all dates from checkin month (eg 27th to 31st)
    for (let i = checkInDateInt; i <= checkInMonthDays; i++) {
      bookedDates.push((new Date(checkInDate.getFullYear(), checkInDate.getMonth(), i).valueOf()));
    }
    // push all dates from checkout month (eg 1st to 3rd)
    for (let x = 1; x < checkOutDate.getDate(); x++) {
      bookedDates.push((new Date(checkOutDate.getFullYear(), checkOutDate.getMonth(), x).valueOf()));
    }
    
  }
  console.log({ bookedDates, checkInDateString, checkOutDateString });
  return ({bookedDates:bookedDates, checkIn:checkInDateString, checkOut:checkOutDateString});
}