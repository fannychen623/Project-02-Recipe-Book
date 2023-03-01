// unfavorite recipe
const unfavoriteRecipeHandler = async (event) => {
    event.preventDefault();
    
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to remove favorite.');
      }
    }
  };
  
  document
    .querySelector('#favorite-star')
    .addEventListener('click', unfavoriteRecipeHandler);
  