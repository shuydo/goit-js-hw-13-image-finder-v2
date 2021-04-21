// 21031732-6fee4eefe658f550324b0a29e
// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
const rootURL = 'https://pixabay.com/api/?image_type=';
const tCont = 'photo'; // type contetnt
const orient = 'horizontal';
// let query = 'cat';
// let pageN = 1; // page No
const pPage = 12; // 200 max
const KEY = '21031732-6fee4eefe658f550324b0a29e'; // my
const constURL = rootURL + 'photo&orientation=horizontal&key=' + KEY + '&q=';

function fetchPix(query,pageN) {
  //   console.log(`${rootURL}${tCont}&orientation=${orient}&q=${query}&page=${pageN}&per_page=${pPage}&key=${KEY}`);
  //   fetch(
  //     `${rootURL}${tCont}&orientation=${orient}&q=${query}&page=${pageN}&per_page=${pPage}&key=${KEY}`,
  //   );
  // fetch(
  //     `${rootURL}${tCont}&q=${query}&per_page=${pPage}&key=${KEY}`,
  //   );
  return fetch(`${constURL}${query}&page=${pageN}&per_page=${pPage}`).then(response => response.json());
}
export default { fetchPix };
