import './styles.css';
import gallery from './handelbars/gallery.hbs';
import debounce from 'lodash.debounce';
import service from './js/service';

const galleryRef = document.querySelector('.js-gallery');
const inputRef = document.querySelector('[name="query"]');
const btnRef = document.querySelector('.btn');

service.query = inputRef.value;
inputRef.addEventListener(
  'input',
  debounce(() => {
    if (inputRef.value.length === 0) {
      galleryRef.innerHTML = '';
      btnRef.classList.add('is-hidden');
    } else {
      service.fetchData().then(data => {
        galleryRef.innerHTML = '';
        const markup = gallery(data.hits);
        galleryRef.insertAdjacentHTML('beforeend', markup);
        btnRef.classList.remove('is-hidden');
      });
    }
  }, 1000),
);

btnRef.addEventListener('click', () => {
  service.fetchData().then(data => {
    const markup = gallery(data.hits);
    galleryRef.insertAdjacentHTML('beforeend', markup);
    window.scrollTo({
      top: 100000,
      left: 10,
      behavior: 'smooth',
    });
  });
});
