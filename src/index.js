// console.clear();
import './styles.css';
const _ = require('lodash');
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import API from './apiService';
import cardTemplate from './card_templ.hbs';
// import { indexOf } from 'core-js/fn/array';

const inputRef = document.querySelector('.search-form');
const galRef = document.querySelector('.gallery');
const moreBtnRef = document.querySelector('.more');
const backwardBtn = document.querySelector('button[data-action="previous"]');
const forwardBtn = document.querySelector('button[data-action="next"]');

let galImgsRef = [];
let galUrls = [];
let searchQuery = 'cat'; // убрать после отладки
let pageN = 1;
let currNumbChoice = 0;
// inputRef.addEventListener('input', _.debounce(onInputChange, 500));
inputRef.addEventListener('submit', onSearch);
moreBtnRef.addEventListener('click', onClickMoreBtn);

galRef.addEventListener('click', onGalContainerClick);
modal.addEventListener('click', click => {
  console.log('modal click');
  if (click.currentTarget === click.target) closeModal();
});

backwardBtn.addEventListener("click", backward);
forwardBtn.addEventListener("click", forward);

function onGalContainerClick(click) {
  // click.preventDefault();
  window.addEventListener('keydown', onKeyPress);

  if (click.target.classList.contains('galImg')) {
    bigImg.src = click.target.dataset.source;

    modal.classList.toggle('is-open');

    currNumbChoice = galUrls.map(arr => arr.large).indexOf(bigImg.src);
  }
}

function onKeyPress(evt) {
  if (evt.code === 'Escape') closeModal();

  if (evt.code === 'ArrowRight') forward();
  if (evt.code === 'ArrowUp') forward();
  if (evt.code === 'PageDown') forward();
  if (evt.code === 'Space') forward();

  if (evt.code === 'ArrowLeft') backward();
  if (evt.code === 'ArrowDown') backward();
  if (evt.code === 'PageUp') backward();
  if (evt.code === 'Backspace') backward();
}
function forward() {
  currNumbChoice += 1;
  if (currNumbChoice === galUrls.length) currNumbChoice = 0;
  changeImg();
}
function backward() {
  if (currNumbChoice === 0) currNumbChoice = galUrls.length;
  currNumbChoice -= 1;
  changeImg();
}
function changeImg() {
  bigImg.src = galUrls[currNumbChoice].large;
  // contentModal.alt = collection[currNumbChoice].original;
}
function closeModal() {
  modal.classList.toggle('is-open');
  window.removeEventListener('keydown', onKeyPress);
  bigImg.src = '';
  // contentModal.alt = "";
}
// function onSearch(evt) {                 // toggle после отладки
function onSearch() {
  // evt.preventDefault();                  // toggle после отладки
  // const submitText = evt.currentTarget;  // toggle после отладки
  // console.log('submitText:_', submitText.elements.query.value, '_searchQuery:_', searchQuery,'_');
  // if (submitText.elements.query.value === searchQuery) return;// toggle после отладки
  pageN = 1;
  galRef.innerHTML = '';
  // searchQuery = submitText.elements.query.value; // toggle после отладки
  // console.log('?', searchQuery, pageN);
  API.fetchPix(searchQuery, pageN).then(res => {
    // console.log(res.hits[0]);
    pageN += 1;

    buildDB(res.hits);
    return renderCard(res.hits);
  });
  //   .catch(onFetchError)
  //   .finally(() => form.reset());

  //   galRef.innerHTML = menu.reduce((acc, Val) => acc + mTemplate(Val), '');
}

function buildDB(arr) {
  // console.log('build', arr);
  // arr.forEach(el =>
  //   // console.log({web:el.webformatURL,large:el.largeImageURL});
  //   galUrls.push({web:el.webformatURL,large:el.largeImageURL})
  // );
  for (let i = 0; i < arr.length; i++) {
    galUrls.push({ web: arr[i].webformatURL, large: arr[i].largeImageURL });
  }
  // console.log(galUrls);

  // console.log([{name:'Mango',surname:'Rudy'}]);
  // console.log(galUrls);
}

function onClickMoreBtn() {
  API.fetchPix(searchQuery, pageN).then(res => {
    pageN += 1;
    renderCard(res.hits);

    window.scrollTo({ top: 2000, left: 100, behavior: 'smooth' });
    setTimeout(function () {
      window.scrollTo({ top: 3000, behavior: 'smooth' });
    }, 2);

    buildDB(res.hits);
    return;
  });
}

function onInputChange(event) {
  console.log(event.target.value);
}

// function onSearch(evt) {
//   evt.preventDefault();
//   const submitText = evt.currentTarget;
//   if (submitText.elements.query.value === searchQuery) return;
//   pageN = 1;
//   galRef.innerHTML = '';
//   searchQuery = submitText.elements.query.value;

//   API.fetchPix(searchQuery, pageN).then(res => {
//     pageN += 1;
//     return renderCard(res.hits);
//   });
// }
function renderCard(array) {
  galRef.insertAdjacentHTML(
    'beforeend',
    array.reduce((acc, Val) => acc + cardTemplate(Val), ''),
  );
}

window.addEventListener('beforeunload', evt => {
  evt.preventDefault();
  evt.returnValue = ' ';
});
onSearch(); // toggle 4 отладки
