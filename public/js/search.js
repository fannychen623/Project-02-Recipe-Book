const searchRecipeHandler = async (event) => {
  let searchInput = document.getElementById('search-input').value.trim();

  const response = await fetch(`/api/recipes/search`, {
    method: 'POST',
    body: JSON.stringify({ searchInput }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const searchResponse = await response.json().then(data => (
    document.querySelectorAll('.column').forEach(function(el) {
      if (data.recipeIds.includes(Number(el.id))) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    })
  ));
};

document
  .querySelector('.search-button')
  .addEventListener('click', searchRecipeHandler);

document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchRecipeHandler();
    }
});