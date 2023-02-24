const deleteCommentHandler = async (event) => {
    event.preventDefault();
    
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/delete-comment/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete comment');
      }
    }
  };
  
  
let comments = document.querySelectorAll('.comment-delete')

comments.forEach((comment) => {
  comment.addEventListener('click', deleteCommentHandler)
})
