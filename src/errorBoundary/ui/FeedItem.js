import React from 'react';

import styles from './FeedItem.module.css';

export default function Card({ title, image }) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title.toUpperCase()}</p>
      <div><img className={styles.image} src={image} alt="" /></div>
    </div>
  )
}