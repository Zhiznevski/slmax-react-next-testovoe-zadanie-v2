'use client';

import { api } from '@/utils/api';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { Basic as Topics } from 'unsplash-js/dist/methods/topics/types';
import Image from 'next/image';
import styles from './gallery.module.css';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SearchOrderBy } from 'unsplash-js/dist/methods/search/types/request';

function Home() {
  const [photos, setPhotos] = useState<Basic[] | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<Topics[] | undefined>(undefined);
  const [topic, setTopic] = useState('');
  const [sorting, setSorting] = useState<SearchOrderBy | undefined>('relevant');

  const sortingHandler = (event: SelectChangeEvent): void => {
    const sort = event.target.value as SearchOrderBy;
    setSorting(sort);
  };

  useEffect(() => {
    api.search
      .getPhotos({
        query: topic || 'cat',
        page: page,
        perPage: 9,
        orientation: 'landscape',
        orderBy: sorting,
      })
      .then((photos) => {
        setPhotos(photos.response?.results);
      });
  }, [page, topic, sorting]);

  useEffect(() => {
    api.topics
      .list({
        page: 1,
        perPage: 10,
      })
      .then((topics) => {
        setCategories(topics.response?.results);
      });
  }, []);
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
          sx={{ marginRight: 4 }}
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
          <Image
            key={photo.id}
            src={photo.urls.regular}
            alt={photo.alt_description || 'Picture'}
            width={380}
            height={270}
            priority
          />
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

export default Home;
