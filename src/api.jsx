import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34757996-44fb61a2c5d4adca97d86e8d6';

export const fetchImages = async ({ query = '', page = 1, perPage = 12 }) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    return response.data.hits;
  } catch (error) {
    return console.log(error);
  }
};
