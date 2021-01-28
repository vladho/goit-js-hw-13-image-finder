import './styles.css';
import gallery from './handelbars/gallery.hbs';
import debounce from 'lodash.debounce';

const apiKey = '20058045-402601a29cd896992a9fb1581';
const galleryRef = document.querySelector('.js-gallery');
const inputRef = document.querySelector('[name="query"]');

// const fetchResult = () => {
//   return fetch(
//     `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ`,
//   ).then(responce => responce.json());
// };
// console.log(fetchResult);

const pageNumber = 1;
inputRef.addEventListener(
  'input',
  debounce(() => {
    // console.log(fetchResult);
    fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputRef.value}&page=${pageNumber}&per_page=12&key=${apiKey}`,
    )
      .then(responce => responce.json())
      .then(data => {
        galleryRef.innerHTML = '';
        //   data.hits
        const markup = gallery(data.hits);
        galleryRef.insertAdjacentHTML('beforeend', markup);
      });
  }, 1000),
);
