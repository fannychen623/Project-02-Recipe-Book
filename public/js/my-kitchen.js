document.addEventListener('DOMContentLoaded', () => {
  // functions to open and close a modal
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

  // add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .close-modal') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });

  // if less than 6 recipes exist, set margin bottom to push footer to the bottom of the page
  if (document.querySelectorAll('.card').length < 6) {
    document.getElementById("my-kitchen").style.marginBottom = "30%" ;
  }
});

const fileInput = document.querySelector('#file-input input[type=file]');
fileInput.onchange = () => {
  // if an image is being uploaded, reset borders for default icons
  document.querySelectorAll('.icon-image').forEach(function(el) {
    el.style.border = "1px solid var(--brown4)";
  });
  //  on file upload, display the file name into the respective element
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#file-input .file-name');
    fileName.textContent = fileInput.files[0].name;
  }
}

// define elements
const instructionList = document.querySelector('#instruction-list');
const ingredientList = document.querySelector('#ingredient-list');

// when the instruction list is empty and clicked, start the numbered bullet
instructionList.onclick = () => {
  var text = document.querySelector('#instruction-list').value;   
  if (text.length == 0 ) {
      document.getElementById("instruction-list").value = "1. ";
      return false;
  }
  else {
      return true;
  }
}

// when the enter key is pressed, send to two new lines and create numbered bullet
instructionList.onkeypress = () => {
  let key = window.event.keyCode;
  if (key === 13) {
    // define value, count the number of rows and add 1
    let text = document.querySelector('#instruction-list').value;   
    let count = (text.split("\n\n")).length + 1;
    // bring to new line and add numbered bullet based on count value
    document.getElementById("instruction-list").value = document.getElementById("instruction-list").value + "\n\n" + count + ". ";
    return false;
  }
  else {
    return true;
  }
}

// when enter key is pressed, send to two new line
ingredientList.onkeypress = () => {
  let key = window.event.keyCode;
  if (key === 13) {
      document.getElementById("ingredient-list").value = document.getElementById("ingredient-list").value + "\n\n";
      return false;
  }
  else {
      return true;
  }
}

// function to display and hide default icon section
const recipeIconHandler = async (event) => {
  event.preventDefault();
  if (document.getElementById("default-icons").style.display === "block") {
    document.getElementById("default-icons").style.display = "none";
  } else {
    document.getElementById("default-icons").style.display = "block" ;
  };
};


// random recipe handler
const randomRecipeHandler = async (event) => {
  event.preventDefault();

  // define prompt value from element
  let providedIngredients = document.querySelector('#provided-ingredient-list').value.trim();
  // reformat prompt to match required format for api call
  providedIngredients = providedIngredients.replace(/, /g, "\\n").replace(/,/g, "\\n")
  // add in default string from defined api prompt
  const ingredientPrompt = "Write a recipe based on these ingredients and instructions:\\n\\nIngredients:\\n" + providedIngredients + "\\n\\nInstructions:"
  
  // display the loading GIF before calling api
  document.querySelector('#loadingGIF').style.display= "block";
  // call api POST request
  const response = await fetch(`/api/openai/`, {
    method: 'POST',
    body: JSON.stringify({ ingredientPrompt }),
    headers: {
      'Content-Type': 'application/json',
    },
  }); 

  // wait for request to complete
  const aiResponse = await response.json().then(data => (
    // hide the loading GIF
    document.querySelector('#loadingGIF').style.display= "none",

    // reformat response to match database format
    data.ingredients = data.ingredients.replace(/\n/g,"\n\n"),
    data.instructions = data.instructions.replace(/\n/g,"\n\n"),

    // pass response from request into respective elements on the page
    document.querySelector('#random-recipe-name').value = data.title,
    document.querySelector('#random-ingredient-list').textContent = data.ingredients,
    document.querySelector('#random-instruction-list').textContent = data.instructions
  ));

  // on success display the completion message
  if (response.ok) {
    document.querySelector('#AiMessage').style.display= "block";
  } else {
    alert('Failed to create recipe');
  }
};

// add random recipe handler
const addRandomRecipeHandler = async (event) => {
  event.preventDefault();

  // define values from elements
  const recipe_name = document.querySelector('#random-recipe-name').value.trim();
  const ingredients = document.querySelector('#random-ingredient-list').value.trim();
  const instructions = document.querySelector('#random-instruction-list').value.trim();

  // ensure all required fields are provided
  if (recipe_name && ingredients && instructions) {
    // call POST request
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({ recipe_name, ingredients, instructions }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // on success, reload the my-kitchen page
    if (response.ok) {
      document.location.replace('/my-kitchen');
    } else {
      alert('Failed to create recipe');
    }
  }
};

// new recipe handler
const newRecipeHandler = async (event) => {
  event.preventDefault();

  // define values from elements
  const recipe_name = document.querySelector('#recipe-name').value.trim();
  const ingredients = document.querySelector('#ingredient-list').value.trim();
  const instructions = document.querySelector('#instruction-list').value.trim();
  // image defined from read file function
  const recipe_image = image_upload;

  // ensure all required fields are provided
  if (recipe_name && ingredients && instructions) {
    // call POST request
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({ recipe_name, ingredients, instructions, recipe_image }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // on success, reload the my-kitchen page
    if (response.ok) {
      document.location.replace('/my-kitchen');
    } else {
      alert('Failed to create recipe');
    }
  }
};

// delete handler
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    // get the data id from the element
    const id = event.target.getAttribute('data-id');

    // pass in request parameter id and call delete request
    const response = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
    });

    // on success, reload the my-kitchen page
    if (response.ok) {
      document.location.replace('/my-kitchen');
    } else {
      alert('Failed to delete recipe.');
    }
  }
};

// add icon handler
const addIconHandler = async (event) => {
  // reset border for all default icons
  document.querySelectorAll('.icon-image').forEach(function(el) {
    el.style.border = "1px solid var(--brown4)";
  });
  // bold border of selected default icon
  event.target.style.border = "5px solid var(--brown5)";

  // define icon source and name
  let source = event.target.getAttribute('src');
  let imgName = /[^/]*$/.exec(source)[0];

  // display file name in upload section
  document.querySelector('#file-input .file-name').textContent = imgName

  let defaultFileImage = null
  fetch(source)
  // define source as blob object
  .then(res => res.blob())
  .then(blob => {
    // convert blob object to file
    defaultFileImage = new File([blob], imgName, blob)

    // upload file into file-input
    document.getElementById("file-input").files = defaultFileImage
    
    // launch file reader and read the file
    const FR = new FileReader();
    FR.onload = (function(defaultFileImage){
        return function(evt){
            image_upload = evt.target.result;
        };
    })(defaultFileImage);   

    // read as base64 encoded string
    FR.readAsDataURL(defaultFileImage);
  });
};

// function to read image files
let image_upload;
function readFile() {
  // check that file has been uploaded
  if (!this.files || !this.files[0]) return;
  
  // launch file reader
  const FR = new FileReader();
  FR.addEventListener("load", function(evt) {
    // set image as reder results
    image_upload = evt.target.result;
  }); 

  // read as base64 encoded string
  FR.readAsDataURL(this.files[0]);
}

// eventlisteners of non-unique query
let recipes = document.querySelectorAll('.delete-recipe')
recipes.forEach((recipe) => {
  recipe.addEventListener('click', delButtonHandler)
})

let icons = document.querySelectorAll('.icon-image')
icons.forEach((icon) => {
  icon.addEventListener('click', addIconHandler)
})

// eventlisteners
document
  .querySelector('.random-recipe-form')
  .addEventListener('submit', randomRecipeHandler);

document
  .querySelector('#add-random-recipe')
  .addEventListener('click', addRandomRecipeHandler);

document
  .querySelector('#new-recipe')
  .addEventListener('click', newRecipeHandler);

document
  .querySelector('#recipe-icons')
  .addEventListener('click', recipeIconHandler);

document
  .querySelector("#img-upload")
  .addEventListener("change", readFile);