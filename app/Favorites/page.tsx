'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Favorites.module.css';
import Button from '@mui/material/Button/Button';
import img from './../../public/empty.png';

export default function Favorites() {
  const storedItems: string[] =
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('items') as string) || [] : [];
  const [photos, setPhotos] = useState(storedItems);

  return (
    <div className={styles.container}>
      {photos.length ? (
        <Button
          sx={{ alignSelf: 'end' }}
          onClick={() => {
            setPhotos([]);
            localStorage.setItem('items', JSON.stringify([]));
          }}
        >
          clear
        </Button>
      ) : (
        <Image src={img} alt={'Picture'} width={380} height={270} priority />
      )}
      <div className={styles.wrapper}>
        {photos.map((item) => (
          <Image key={item} src={item} alt={'Picture'} width={380} height={270} priority />
        ))}
      </div>
    </div>
  );
}
