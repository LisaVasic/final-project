import React, { useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import trip from '../reducers/addtrip'
import { API_URL } from '../utils/utils'
//import { useNavigate } from 'react-router-dom';
import Datepicker from '../components/Datepicker';

const AddTrip = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({title: title, date: date})
    }
    fetch(API_URL("addtrip"), options)
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        batch(()=>{
          dispatch(trip.actions.setTitle(data.response.title))
          dispatch(trip.actions.setDate(data.response.date))
          dispatch(trip.actions.setError(null))
        })
      } else {
        batch(()=>{
          alert("Something went wrong");
        })
      } 

    })
  }



  return (
    <>
    <h1>Where to next?</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="Title">Destination:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Datepicker selectedDate={date} setSelectedDate={setDate} />
      <button type="submit">Add trip</button>
    </form>
    </>
  );
};

export default AddTrip;






