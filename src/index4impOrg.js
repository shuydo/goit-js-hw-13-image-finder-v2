import './styles.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
const _ = require('lodash');
import API from './apiService';
import cardTemplate from './card_templ.hbs';

const inputRef = document.querySelector('.search-form');
const galRef = document.querySelector('.gallery');
const moreBtnRef = document.querySelector('.more');

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
  if (click.currentTarget === click.target) closeModal();
});

function onGalContainerClick(click) {
  // click.preventDefault();
  window.addEventListener('keydown', onKeyPress);

  if (click.target.classList.contains('galImg')) {
    bigImg.src = click.target.dataset.source;

    modal.classList.toggle('is-open');
  }
}

function onKeyPress(evt) {
  if (evt.code === 'Escape') closeModal();
  if (evt.code === 'ArrowRight') forward();
  if (evt.code === 'ArrowLeft') backward();
}
function closeModal() {
  modal.classList.toggle('is-open');
  window.removeEventListener('keydown', onKeyPress);
  bigImg.src = '';
  // contentModal.alt = "";
}
// function forward() {
//   currNumbChoice += 1;
//   if (currNumbChoice === collAlts.length) currNumbChoice = 0;
//   changeImg();
// }
// function backward() {
//   if (currNumbChoice === 0) currNumbChoice = collAlts.length;
//   currNumbChoice -= 1;
//   changeImg();
// }
// function changeImg() {
//   contentModal.src = collection[currNumbChoice].original;
//   contentModal.alt = collection[currNumbChoice].original;
// }
function buildDB(ar) {
  console.log('build',ar);
  // arr.forEach(el => 
  //   // console.log({web:el.webformatURL,large:el.largeImageURL});
  //   galUrls.push({web:el.webformatURL,large:el.largeImageURL})
  // );
  // for (let i = 0; i < arr.length; i++) {
    // const element = {web:arr[i].webformatURL,large:arr[i].largeImageURL};
    // galUrls.push()
  

  // console.log([{name:'Mango',surname:'Rudy'}]);
  // console.log(galUrls);
}
function onClickMoreBtn() {
  // console.log('onClickMoreBtn');

  API.fetchPix(searchQuery, pageN).then(res => {
    pageN += 1;
    // buildDB(res.hits);
    renderCard(res.hits);

    // window.scrollTo({ top: 3000, behavior: 'smooth' });

    return;
  });
}

function onInputChange(event) {
  // event.preventDefault();
  // inputCbInvocationCounter += 1;
  console.log(event.target.value);
  // if (event.target.value)
  //   API.fetchCountries(event.target.value)
  //     .then(res => {
  //       console.table(`${res.length} - matches`);
  //       if (res.length > 10) return notify();

  //       if (res.length > 1) return renderCountrieTen(res);
  //       return renderCountrie(res[0]);
  //     })
  //     .catch(onFetchError);
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

  // console.log('?', searchQuery);

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
function renderCard(array) {
  // console.log('arr',array.reduce((acc, Val) => acc + cardTemplate(Val), ''));
  // galRef.innerHTML = cardTemplate(obj);

  // galRef.innerHTML = array.reduce((acc, Val) => acc + cardTemplate(Val), '');
  galRef.insertAdjacentHTML(
    'beforeend',
    array.reduce((acc, Val) => acc + cardTemplate(Val), ''),
  );
  // galRef.insertAdjacentHTML("beforeend", cardTemplate(array));

  // gridRef.innerHTML = menu.reduce((acc, Val) => acc + mTemplate(Val), '');

  // galImgsRef=document.querySelectorAll('.galImg');
  // console.log(galImgsRef.length);
  // console.log(document.querySelector('.galImg'));
}

onSearch(); // toggle 4 отладки
