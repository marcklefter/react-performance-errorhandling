import React, {
  useContext,
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import getErrorContext from '../errorContext'

import AppError from '../AppError';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  
  const {
    capture,
    trace
  } = useContext(getErrorContext());
  
  useEffect(() => {
    async function fetchProfile() {
      try {
        const result = await axios('https://randomuser.me/api/');

        setProfile(result.data.results[0]);
      } catch (error) {
        capture(error);
      }
    }

    fetchProfile();
  }, [capture]);

  const onEditDetails = () => {
    try {
      throw new AppError('Could not edit user details');
    } catch (error) {
      trace(error);
    }
  };

  // ...

  if (!profile) {
    return null;
  }

  const {
    name,
    picture
  } = profile;

  return (
    <>
      <p>{name.first} {name.last}</p>
      <div style={{ marginBottom: 50 }}>
        <img src={picture.large} alt="" />
      </div>
      <button onClick={onEditDetails}>Edit Details</button>
    </> 
  )
}