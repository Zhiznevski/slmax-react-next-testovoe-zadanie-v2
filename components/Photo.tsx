"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button/Button';
import styles from './Photo.module.css';
import { useSession } from 'next-auth/react';


type Props = {
    photo: Basic, 
    addItem: (id: string) => void,

}


function Photo({photo, addItem}: Props) {
  const session = useSession();
  return <div className={styles.wrapper}>
    {session.data && <Button sx={{position: 'absolute', top: '10px', right: '10px'}} 
    onClick={() => addItem(photo.urls.regular)}
  disabled={false}
  size="small"
  variant="contained"
  color="inherit"
><FavoriteBorderIcon color="inherit" /></Button>
}
    <Image  
            key={photo.id}
            src={photo.urls.regular}
            alt={photo.alt_description || 'Picture'}
            width={380}
            height={270}
            priority
          />
  </div>;
}

export default Photo;
