const fileInput = document.querySelector('#file-input input[type=file]');
fileInput.onchange = () => {
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#file-input .file-name');
    fileName.textContent = fileInput.files[0].name;
  }
}

const updateRecipeHandler = async (event) => {
    event.preventDefault();
  
    const recipe_name = document.querySelector('#recipe-name').value.trim();
    const ingredients = document.querySelector('#ingredient-list').value.trim();
    const instructions = document.querySelector('#instruction-list').value.trim();
    const recipe_image = image_upload;

    const id = document.querySelector('#recipe-id').value.trim();

    if (recipe_name && ingredients && instructions) {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
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

  document
  .querySelector('#update-recipe')
  .addEventListener('click', updateRecipeHandler);


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

document
  .querySelector("#img-upload")
  .addEventListener("change", readFile);