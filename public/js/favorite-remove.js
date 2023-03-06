// unfavorite recipe handler
const unfavoriteRecipeHandler = async (event) => {
    event.preventDefault();
    
    // define data id from element
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      // pass in request parameter id and call DELETE request
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
      });

      // on success, reload page
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to remove favorite.');
      }
    }
  };

  // eventlistener
  document
    .querySelector('#favorite-star')
    .addEventListener('click', unfavoriteRecipeHandler);
  