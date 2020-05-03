import React, {
  useState
} from 'react';

import AppError from '../AppError';

const profile = require('../profile.json').results[0];

export default function Profile() {
  const [error, setError] = useState(null);
  
  const onEditDetails = () => {
    try {
      throw new AppError('Could not edit user details');
    } catch (error) {
      setError(error);
    }
  };

  // ...

  if (error) {
    throw error;
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