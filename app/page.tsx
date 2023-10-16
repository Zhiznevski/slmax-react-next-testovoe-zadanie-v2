'use client';

import { api } from '@/utils/api';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { Basic as Topics } from 'unsplash-js/dist/methods/topics/types';
import styles from './gallery.module.css';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SearchOrderBy } from 'unsplash-js/dist/methods/search/types/request';
import getCategories from '@/utils/getCategories';
import Photo from '@/components/Photo';

export default function Home() {
  const storedItems: string[] = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('items') as string) || [] : false;

  const [photos, setPhotos] = useState<Basic[] | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<Topics[] | undefined>(undefined);
  const [topic, setTopic] = useState('');
  const [sorting, setSorting] = useState<SearchOrderBy | undefined>('relevant');
  const [likes, setLikes] = useState<string[]>(storedItems);

  const addItem = (id: string) => {
    if (!likes.includes(id)) {
      setLikes([...likes, id])
    }
}
  const sortingHandler = (event: SelectChangeEvent): void => {
    const sort = event.target.value as SearchOrderBy;
    setSorting(sort);
  };

  useEffect(() => {
    api.search
      .getPhotos({
        query: topic || 'corgi',
        page: page,
        perPage: 9,
        orientation: 'landscape',
        orderBy: sorting,
      })
      .then((photos) => {
        setPhotos(photos.response?.results);
      })
      .catch(error => console.error(error))
  }, [page, topic, sorting]);

  useEffect(() => {
      getCategories()
      .then((topics) => {
        setCategories(topics.response?.results);
      })
      .catch(error => console.error(error))
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(likes));
  }, [likes]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <ul className={styles.list}>
          {categories?.map((topic) => (
            <li className={styles.item} key={topic.id}>
              <a onClick={() => setTopic(topic.title)} key={topic.id}>
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
        <Select
          sx={{ marginRight: 4, color: '#767676' }}
          variant="standard"
          value={sorting}
          onChange={sortingHandler}
        >
          <MenuItem value={'relevant'}>Relevant</MenuItem>
          <MenuItem value={'latest'}>Latest</MenuItem>
        </Select>
      </div>
      <div className={styles.photosWrapper}>
        {photos?.map((photo) => (
          <Photo key={photo.id} photo={photo} addItem={addItem}/>
        ))}
      </div>
      <Pagination
        sx={{ alignSelf: 'center' }}
        page={page}
        count={10}
        variant="outlined"
        color="primary"
        onChange={(_, num): void => {
          setPage(num);
        }}
      />
    </div>
  );
}