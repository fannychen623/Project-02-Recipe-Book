const fileInput = document.querySelector('#file-input input[type=file]');
//  on file upload, display the file name into the respective element
fileInput.onchange = () => {
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#file-input .file-name');
    fileName.textContent = fileInput.files[0].name;
  }
}

// update recipe handler
const updateRecipeHandler = async (event) => {
  event.preventDefault();

  // define values from elements
  const recipe_name = document.querySelector('#recipe-name').value.trim();
  const ingredients = document.querySelector('#ingredient-list').value.trim();
  const instructions = document.querySelector('#instruction-list').value.trim();
  // image defined from read file function
  const recipe_image = image_upload;

  // define recipe id to assign request
  const id = document.querySelector('#recipe-id').value.trim();

  // ensure all required fields are provided
  if (recipe_name && ingredients && instructions) {
    // pass in request parameter id and call PUT request
    const response = await fetch(`/api/recipes/${id}`, {
      method: 'PUT',
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

// eventlisteners
document
  .querySelector('#update-recipe')
  .addEventListener('click', updateRecipeHandler);

document
  .querySelector("#img-upload")
  .addEventListener("change", readFile);