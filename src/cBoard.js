refs.searchForm.addEventListener('input', _.debounce(onInputChange, 500));
// let inputCbInvocationCounter = 0;

function onInputChange(event) {
    // inputCbInvocationCounter += 1;
    if (event.target.value)
      API.fetchCountries(event.target.value)
        .then(res => {
          console.table(`${res.length} - matches`);
          if (res.length > 10) return notify();
          // (refs.cardContainer.innerHTML =
          //   'Too many matches found. Please enter a more specific query!');
  
          if (res.length > 1) return renderCountrieTen(res);
          return renderCountrie(res[0]);
        })
        .catch(onFetchError);
  }
  
  function onSearch(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchQuery = form.elements.query.value;
  
    API.fetchCountries(searchQuery)
      .then(res => {
        // console.table(res);
        return renderCountrie(res[0]);
      })
      .catch(onFetchError)
      .finally(() => form.reset());
  }
  
  function onFetchError(error) {
    console.log(error);
    alert('There is no such sequence of characters');
  }