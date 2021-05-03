function onSearch(evt) {
    console.log('on search fn');
    // toggle после отладки
    // function onSearch() {
    // evt.preventDefault(); // toggle после отладки
    const submitText = evt.currentTarget; // toggle после отладки
    console.log(
      'submitText:_',
      submitText.elements.query.value,
      '_searchQuery:_',
      searchQuery,
      '_',
    );
  
    if (submitText.elements.query.value.trim() === searchQuery) return; // toggle после отладки
    pageN = 1; // if not empty query, then let=1
    galRef.innerHTML = '';
    searchQuery = submitText.elements.query.value.trim(); // toggle после отладки
    // console.log('?', searchQuery, pageN);
    API.fetchPix(searchQuery, pageN).then(res => {
      // console.log(res.hits[0]);
      pageN += 1;
  
      return renderCard(res.hits);
    });
    //   .catch(onFetchError)
    //   .finally(() => form.reset());
  
    //   galRef.innerHTML = menu.reduce((acc, Val) => acc + mTemplate(Val), '');
}