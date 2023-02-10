import React, { useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
//import user from '../reducers/user';
//import { API_URL } from '../utils/utils'
import { useNavigate } from 'react-router-dom';
import Datepicker from '../components/Datepicker';

const AddTrip = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  //const [countdown, setCountdown] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/addtrip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date }),
      });
      const result = await response.json();
      if (data.success) {
        setTitle('');
        setDate('');
        //setCountdown('');
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      < Datepicker />
      <button type="submit">Add trip</button>
    </form>
    </>
  );
};

export default AddTrip;







/*const Addtrip = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const navigate = useNavigate();
    
        useEffect( () => {
            if (!accessToken) {
                navigate("/login");
            }
        }, []);

  return (
    <h1>Where to next</h1>
  );
}*/