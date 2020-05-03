import React, {
  useContext
} from 'react';

import AppError from '../AppError';
import ErrorHandler from '../ErrorHandler';
import getErrorContext from '../errorContext';

import FeedItem from './FeedItem';

// ...

const items = [
  {
    title: 'first item',
    image: 'http://via.placeholder.com/350x150'
  },
  {
    title: 'second item',
    image: 'http://via.placeholder.com/350x150'
  },
  {
    // by commenting out the title property, an error will occur in the Card component that receives it.

    title: 'third item',
    image: 'http://via.placeholder.com/350x150'
  }
];

// ...

function FeedItemFallback() {
  return (
    <FeedItem
      title="Oops, an error occurred!"
      image="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
    />
  )
}

export default function Feed() {
  const {
    trace
  } = useContext(getErrorContext()); 

  const onRefresh = () => {
    try {
      throw new AppError('Could not refresh feed');
    } catch (error) {
      trace(error);
    }
  }

  return (
    <>
      <button onClick={onRefresh}>Refresh</button>

      {items.map((item, i) => (
        <ErrorHandler key={i} fallback={FeedItemFallback}>
          <FeedItem {...item} />
        </ErrorHandler>
      ))}
    </>
  )
}