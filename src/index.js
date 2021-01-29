import './styles.css';
import gallery from './handelbars/gallery.hbs';
import carousel from './handelbars/carousel.hbs';
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
//modalka

const carouselInner = document.querySelector('.js-carousel-inner');
const openModalRef = document.querySelector('.js-button');
const openModal = document.querySelector('.js-lightbox');

openModalRef.addEventListener('click', event => {
  event.preventDefault;
  // console.log(event);
  service.fetchData().then(data => {
    console.log(openModal);
    openModal.classList.add('is-open');
    const markup = carousel(data.hits);
    carouselInner.insertAdjacentHTML('beforeend', markup);
    const carouselItem = carouselInner.querySelector('.carousel-item');
    carouselItem.classList.add('active');
    const testRef = document.querySelectorAll('.test');
  });
});
