// search recipe handler
const searchRecipeHandler = async (event) => {
  // define search input from element
  let searchInput = document.getElementById('search-input').value.trim();

  // call POST request
  const response = await fetch(`/api/recipes/search`, {
    method: 'POST',
    body: JSON.stringify({ searchInput }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // wait for rrequest to complete
  const searchResponse = await response.json().then(data => (
    // loop through all recipes on the page
    document.querySelectorAll('.column').forEach(function(el) {
      // hide recipes where data id is not in recipe id array from response
      if (data.recipeIds.includes(Number(el.id))) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    })
  ));
};

// eventlisteners
document
  .querySelector('.search-button')
  .addEventListener('click', searchRecipeHandler);

// call function on enter key
document.getElementById('search-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchRecipeHandler();
  }
});