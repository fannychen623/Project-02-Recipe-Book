const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#comment-text').value.trim();
    const post_id = document.querySelector('#comment-post-id').value.trim();

    if (comment_text && post_id) {
      const response = await fetch(`/comment-create`, {
        method: 'POST',
        body: JSON.stringify({ comment_text, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', newCommentHandler);