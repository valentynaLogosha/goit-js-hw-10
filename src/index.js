import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorr = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

toggleMessage(errorr, `none`);
function toggleMessage(el, state) {
  el.style.display = state;
}

function showCatInfo(imageUrl, breedName, description, temperament) {
   // Ф-я додає зображення кота, назву породи, опис та характер до відображення
  // Параметри:
  //   - imageUrl: URL-адреса зображення кота
  //   - breedName: Назва породи кота
  //   - description: Опис породи кота
  //   - temperament: Характер породи кота
  const catImage = document.createElement('img');
  catImage.src = imageUrl;
  catInfo.appendChild(catImage);

  const breedTitle = document.createElement('h2');
  breedTitle.textContent = breedName;
  catInfo.appendChild(breedTitle);

  const descriptionPara = document.createElement('p');
  descriptionPara.textContent = description;
  catInfo.appendChild(descriptionPara);

  const temperamentPara = document.createElement('p');
  temperamentPara.textContent = temperament;
  catInfo.appendChild(temperamentPara);

  catInfo.style.display = 'block';
}

function clearCatInfo() {
  catInfo.innerHTML = '';
  catInfo.style.display = 'none';
}

function populateBreedSelect(breeds) {
   //Ф-я наповнює випадаючий список з породами котів
  // Параметри:
  //   - breeds: Масив об'єктів з інформацією про породи котів
  const options = breeds.map(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    return option;
  });

  breedSelect.append(...options);
}

breedSelect.addEventListener('change', () => {
  const breedId = breedSelect.value;
  clearCatInfo();
  toggleMessage(loader, `block`);
  fetchCatByBreed(breedId)
    .then(data => {
      const cat = data[0];
      const { url, breeds } = cat;
      const { name, description, temperament } = breeds[0];
      showCatInfo(url, name, description, temperament);
    })
    .catch(error => {
      toggleMessage(errorr, `block`);
      console.error(error);
    })
    .finally(() => toggleMessage(loader, `none`));
});

toggleMessage(loader, `block`);
fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
  })
  .catch(error => {
    toggleMessage(errorr, `block`);
    console.error(error);
  })
  .finally(() => toggleMessage(loader, `none`));