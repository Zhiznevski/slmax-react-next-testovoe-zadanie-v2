"use client"

import { api} from "@/utils/api"
import { useEffect, useState } from "react"
import { Basic } from "unsplash-js/dist/methods/photos/types";

function Home() {
  const [photos, setPhotos] = useState<Basic[] | undefined>(undefined)
  useEffect(() => {
      api.search.getPhotos({
      query: 'cats',
      page: 1,
      perPage: 10,
      orientation: "landscape",
    })
    .then(photos => {
        setPhotos(photos.response?.results)
        console.log(photos.response?.results)

    })
  }, [])
  return (
    <>
    <h1>Main page</h1>
    <ul></ul>
    {photos?.map(photo => (
      <img className="img" key={photo.id} src={photo.urls.regular}></img>
      
    ))
    }
    </>
  )
}

export default Home