import { useState } from 'react';
import { Datepicker } from '../Datepicker';
import { Roompicker } from '../Roompicker/Roompicker';

export const Accommodation = () => {
  
  //State while backend process available rooms
  const [availableRooms, setAvailableRooms] = useState(); //If empty, server has not returned data on available rooms
  console.log('availablerooms', availableRooms);
  return (
    <div>

      {
        !availableRooms
          ? <Datepicker availableRooms={availableRooms} setAvailableRooms={setAvailableRooms} />
          : <Roompicker availableRooms={availableRooms} />
      }

    </div>
  )
}