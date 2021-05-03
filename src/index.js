import './styles.css';
const _ = require('lodash');
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import API from './apiService';
import cardTemplate from './card_templ.hbs';

const inputRef = document.querySelector('.search-form');
const galRef = document.querySelector('.gallery');
const backwardBtn = document.querySelector('button[data-action="previous"]');
const forwardBtn = document.querySelector('button[data-action="next"]');

let galImgsRef = [];
let searchQuery = '';
let pageN = 1;
let currNumbChoice = 0;

inputRef.addEventListener('input', _.debounce(onInputChange, 500));
galRef.addEventListener('click', onGalContainerClick);
backwardBtn.addEventListener('click', backward);
forwardBtn.addEventListener('click', forward);
modal.addEventListener('click', click => {
  if (click.currentTarget === click.target) closeModal();
});

function inViewPort(entries, observer) {
  // console.log('in inVP', searchQuery, pageN,entries[0].target.src);
  if (entries[0].isIntersecting) {
    API.fetchPix(searchQuery, pageN).then(res => {
      pageN += 1;
      observer.unobserve(entries[0].target);
      renderCard(res.hits);
    });
  }
}
function onGalContainerClick(click) {
  // click.preventDefault();
  window.addEventListener('keydown', onKeyPress);
  if (click.target.classList.contains('galImg')) {
    bigImg.src = click.target.dataset.source;

    modal.classList.toggle('is-open');
    document.body.classList.toggle('no-scroll');

    // console.log(galImgsRef);
    // currNumbChoice = galUrls.indexOf(bigImg.src);
    currNumbChoice = [].map
      .call(galImgsRef, arr => arr.dataset.source)
      .indexOf(bigImg.src);

    // console.log(click.target.dataset.id);
    // console.log(currNumbChoice);
    // console.log('in onGalClick: ', galImgsRef);
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

  // console.log(evt.code);
}
function forward() {
  currNumbChoice += 1;
  if (
    currNumbChoice === [].map.call(galImgsRef, arr => arr.dataset.source).length
  )
    currNumbChoice = 0;
  changeImg();
}
function backward() {
  if (currNumbChoice === 0)
    currNumbChoice = [].map.call(galImgsRef, arr => arr.dataset.source).length;
  currNumbChoice -= 1;
  changeImg();
}
function changeImg() {
  bigImg.src = [].map.call(galImgsRef, arr => arr.dataset.source)[
    currNumbChoice
  ];
}
function closeModal() {
  modal.classList.toggle('is-open');
  document.body.classList.toggle('no-scroll');
  window.removeEventListener('keydown', onKeyPress);
  bigImg.src = '';
  // contentModal.alt = "";
}
function onInputChange(event) {
  // console.log('on input Change ', pageN,inputRef[0].value);
  if (!event.target.value.trim()) return;
  if (event.target.value.trim() === searchQuery) return;
  galRef.innerHTML = '';
  pageN = 1;

  searchQuery = event.target.value.trim();
  API.fetchPix(searchQuery, pageN).then(res => {
    pageN += 1;
    inputRef[0].value = searchQuery; // correct query in input form
    return renderCard(res.hits);
  });
}
function renderCard(array) {
  galRef.insertAdjacentHTML(
    'beforeend',
    array.reduce((acc, Val) => acc + cardTemplate(Val), ''),
  );
  galImgsRef = document.querySelectorAll('img[loading="lazy"]');

  observer.observe(galImgsRef[galImgsRef.length - 1]);

  // начало инструкции для нативной и принудительной подержки Lazy
  if ('loading' in HTMLImageElement.prototype)
    galImgsRef.forEach(img => (img.src = img.dataset.src));
  else {
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.integrity =
      'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
    script.crossorigin = 'anonymous';
    document.body.appendChild(script);
  } // конец
}

API.fetchPix(searchQuery, 1).then(res => {
  pageN += 1;
  renderCard(res.hits);
});

const observer = new IntersectionObserver(inViewPort, { threshold: 0.01 });
