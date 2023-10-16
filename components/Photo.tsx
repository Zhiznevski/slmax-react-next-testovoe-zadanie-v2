'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button/Button';
import styles from './Photo.module.css';
import { useSession } from 'next-auth/react';

type Props = {
  photo: Basic;
  addItem: (id: string) => void;
};

function Photo({ photo, addItem }: Props) {
  const [isLike, setIsLike] = useState(false);
  const storedItems: string[] =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('items') as string) || []
      : false;
  const session = useSession();
  return (
    <div className={styles.wrapper}>
      {session.data && (
        <Button
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={() => {
            addItem(photo.urls.regular);
            setIsLike(true);
          }}
          disabled={false}
          size="small"
          variant="contained"
          color="inherit"
        >
          {storedItems.includes(photo.urls.regular) || isLike ? (
            <FavoriteIcon color="info" />
          ) : (
            <FavoriteBorderIcon color="inherit" />
          )}
        </Button>
      )}
      <Image
        key={photo.id}
        src={photo.urls.regular}
        alt={photo.alt_description || 'Picture'}
        width={360}
        height={260}
        priority
      />
    </div>
  );
}

export default Photo;
