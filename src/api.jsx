import axios from 'axios';

const API_KEY = '34757996-44fb61a2c5d4adca97d86e8d6';
const perPage = 12;
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}&q=`;

export const fetchImagesApi = ({ query = '', page = 1 }) => {
  const url = `${BASE_URL}${query}&page=${page}`;
  return axios.get(url).then(({ data }) => data.hits);
};
