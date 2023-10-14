"use client"

import { api} from "@/utils/api"
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react"
import { Basic } from "unsplash-js/dist/methods/photos/types";
import Image from 'next/image'

function Home() {
  const [photos, setPhotos] = useState<Basic[] | undefined>(undefined)
  const [page, setPage] = useState(1);
  useEffect(() => {
      api.search.getPhotos({
      query: 'french bulldog',
      page: page,
      perPage: 10,
      orientation: 'landscape',
      orderBy: 'relevant',
    })
    .then(photos => {
        setPhotos(photos.response?.results)
        console.log(photos.response?.results)

    })
  }, [page])
  return (
    <>
    <h1>Main page</h1>
    {photos?.map(photo => (
      <Image key={photo.id} src={photo.urls.regular} alt={photo.alt_description || 'Picture'} width={400} height={280} priority/>
      
    ))
    }
    <Pagination page={page} count={10} variant="outlined" color="primary" onChange={(_, num): void => {
              setPage(num);
            }} />
    </>
  )
}

export default Home