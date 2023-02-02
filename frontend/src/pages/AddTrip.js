import React, {useEffect} from 'react';
import { useDispatch, use } from 'react-redux';
import user from '../reducers/user';
import { API_URL } from '../utils/utils'
import { useNavigate } from 'react-router-dom';

const addtrip = () => {
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
}

export default addtrip;