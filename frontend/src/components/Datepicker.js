import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = () => {
  const [date, setDate] = useState(null);

  const handleDateChange = selectedDate => {
    setDate(selectedDate);
  };

  return (
    <div className="date-picker">
      <label htmlFor="Date">Date:</label>
      <DatePicker
        selected={date}
        //value={date}
        //onChange={event => handleDateChange(event.target.value)}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default Datepicker;