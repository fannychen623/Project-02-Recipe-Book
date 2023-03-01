document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});


const newRecipeHandler = async (event) => {
  event.preventDefault();

  const recipe_name = document.querySelector('#recipe-name').value.trim();
  const ingredients = document.querySelector('#ingredient-list').value.trim();
  const instructions = document.querySelector('#instruction-list').value.trim();
  const recipe_image = image_upload;

  if (recipe_name && ingredients && instructions) {
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({ recipe_name, ingredients, instructions, recipe_image }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/my-kitchen');
    } else {
      alert('Failed to create recipe');
    }
  }
};
  
let image_upload;

function readFile() {
  
  if (!this.files || !this.files[0]) return;
    
  const FR = new FileReader();
    
  FR.addEventListener("load", function(evt) {
    // console.log(evt.target.result)
    image_upload = evt.target.result;
  }); 
    
  FR.readAsDataURL(this.files[0]);
  
}

document.querySelector("#img-upload").addEventListener("change", readFile);



const delButtonHandler = async (event) => {

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/my-kitchen');
    } else {
      alert('Failed to delete recipe.');
    }
  }
};


document
  .querySelector('.new-recipe-form')
  .addEventListener('submit', newRecipeHandler);

let recipes = document.querySelectorAll('.delete-recipe')

recipes.forEach((recipe) => {
  recipe.addEventListener('click', delButtonHandler)
})