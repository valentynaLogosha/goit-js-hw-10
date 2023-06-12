const BASE_URL = `https://api.thecatapi.com/v1`;
const API_KEY = `live_rn5aYwdw7Ze3KL4j0aZ8Aj3R5FikgGGAe5xEZTqkCYvjKDaM9ALrv3k5xuNMxkWk`;

// Функція для отримання списку порід котів
export function fetchBreeds() {
  const url = `${BASE_URL}/breeds`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
// Функція для отримання зображень котів за заданою породою
export function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}