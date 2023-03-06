// favorite recipe handler
const favoriteRecipeHandler = async (event) => {
  event.preventDefault();

  // define data id from elemet
  if (event.target.hasAttribute('data-id')) {
    const recipe_id = event.target.getAttribute('data-id');

    // call POST request
    const response = await fetch(`/api/favorites`, {
      method: 'POST',
      body: JSON.stringify({recipe_id}),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    // on success, reload the page
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add favorite.');
    }
  }
};
  
// eventlistener
document
  .querySelector('#blank-star')
  .addEventListener('click', favoriteRecipeHandler);