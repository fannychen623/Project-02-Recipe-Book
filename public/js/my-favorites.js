const deletePostHandler = async (event) => {
  event.preventDefault();
  
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/favorites/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/my-favorites');
    } else {
      alert('Failed to remove favorite.');
    }
  }
};

document
  .querySelector('.delete-favorite')
  .addEventListener('click', deletePostHandler);
