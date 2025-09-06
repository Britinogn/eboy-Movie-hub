
import axios from 'axios';

const api = axios.create ({
   baseURL: 'https://Movies-Verse.proxy-production.allthingsdev.co/api',
   headers: { 
      'x-apihub-key': 'XjCsS-2DdZicjg7fY0rcoqrHjEujH8OTOHvIbXqbbtiEotl9oL', 
      'x-apihub-host': 'Movies-Verse.allthingsdev.co', 
      'x-apihub-endpoint': '4f700f4a-4bd2-4604-8d5b-7b5e4c976c65'
   }
});

export const getUpcomingMovies = () => {
  return api.get("/movies/upcoming-tv-shows");
};


export default api;