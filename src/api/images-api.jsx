const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32988992-2bc6a6b6a626cf7787248a3b3';

export const getImages = (searchWord, page) => {
  const response = fetch(
    `${BASE_URL}?q=${searchWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
};
