import { createApi } from 'unsplash-js';

const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY as string;

export const api = createApi({
  accessKey: accessKey,
});
