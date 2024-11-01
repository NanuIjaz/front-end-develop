// Axios
import defaultAxios from 'axios';

const axios = defaultAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'local.env',
});

export { axios };
