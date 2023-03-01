// favorite recipe
const favoriteRecipeHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const recipe_id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/favorites`, {
      method: 'POST',
      body: JSON.stringify({recipe_id}),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add favorite.');
    }
  }
};

document
.querySelector('#blank-star')
.addEventListener('click', favoriteRecipeHandler);

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
