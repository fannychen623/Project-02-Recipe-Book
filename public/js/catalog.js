document.addEventListener('DOMContentLoaded', function() {
  // on page load, display the first two recipes
  document.getElementById("0").style.display= "block" ;
  document.getElementById("1").style.display= "block" ;

  // define the two pages and roate the images on the page
  const page1 = document.getElementById("0");
  const page2 = document.getElementById("1");
  page1.querySelector('.image').style.transform= "rotate(355deg)";
  if (page2) {
    page2.querySelector('.image').style.transform= "rotate(5deg)";
  }

  // count the total number of recipes
  // divide by 2 and round up to get the page count number 
  document.getElementById("last-page").innerHTML = Math.ceil(document.querySelectorAll('.recipe-page').length/2);

  // loop through all the recipes
  document.querySelectorAll('.recipe-page').forEach(function(el) {
    // if the recipe name is over 15 characters in length, break up the title into two lines
    if (el.querySelector('.title').textContent.length > 15) {
      let firstrow = el.querySelector('.title').textContent.substr(0, 15);
      if (firstrow.indexOf(" ") < 0) {
        firstrow = el.querySelector('.title').textContent.substring(0, el.querySelector('.title').textContent.indexOf(' '));
      } else {
        firstrow = firstrow.substr(0, Math.min(firstrow.length, firstrow.lastIndexOf(" ")));
      }
      let secondrow = el.querySelector('.title').textContent.replace(firstrow, "");
      secondrow = secondrow.trimStart();
      el.querySelector('.title').innerHTML = firstrow + "<br>" + secondrow

      // push the element higher to center on the page
      el.style.position = "relative";
      el.style.top = "-30px";
    }
  });
}, false);

// flip to the next page
function nextPage() {
  // define current and last page from elements
  let currentPage = Number(document.getElementById("current-page").innerHTML)
  let lastPage = Number(document.getElementById("last-page").innerHTML)

  // if not already on the last page
  if (currentPage < lastPage) {
    // add 1 to the current page and update the value on the page navigation element
    currentPage++;
    document.getElementById("current-page").textContent = currentPage;

    // loop through all the recipes and hide them
    document.querySelectorAll('.recipe-page').forEach(function(el) {
      el.style.display = "none";
    });

    // get the id value of the next two recipes based on the page value
    const catalog2 = (currentPage * 2) - 1
    const catalog1 = catalog2 - 1
    const page1 = document.getElementById(catalog1);
    const page2 = document.getElementById(catalog2);

    // display the next two recipes
    page1.style.display= "block";
    if (page2) {
      page2.style.display= "block";
    } else {
      // if odd number of recipes, and on the last page
      // create a blank tile to orient recipe on the left page correctly
      const blankPage = document.createElement("div");
      blankPage.className = "tile is-parent is-4 recipe-page"
      document.getElementById("recipe-posts").appendChild(blankPage);
    }

    // Based on the page value, rotate the images in opposite directions
    if ((catalog1 + 4) % 4 == 0) {
      page1.querySelector('.image').style.transform = "rotate(355deg)";
      if (page2) {
        page2.querySelector('.image').style.transform = "rotate(5deg)";
      }
    } else if ((catalog1 + 4) % 4 == 2) {
      page1.querySelector('.image').style.transform = "rotate(5deg)";
      if (page2) {
        page2.querySelector('.image').style.transform = "rotate(355deg)";
      }
    };
  };
}

function previousPage() {
  // define the current page from element
  let currentPage = Number(document.getElementById("current-page").innerHTML)

  // if not on the first page
  if (currentPage > 1) {
    // subtract 1 from the current page and update the value on the page navigation element
    currentPage--;
    document.getElementById("current-page").textContent = currentPage;

    // loop through all the recipes and hide them
    document.querySelectorAll('.recipe-page').forEach(function(el) {
      el.style.display = "none";
    });

    // get the id value of the previous two recipes based on the page value
    const catalog2 = (currentPage * 2) - 1
    const catalog1 = catalog2 - 1
    const page1 = document.getElementById(catalog1);
    const page2 = document.getElementById(catalog2);

    // display the previous two recipes
    page1.style.display= "block";
    if (page2) {
      page2.style.display= "block";
    } else {
      // if only 1 recipe exist
      // create a blank tile to orient recipe on the left page correctly
      const blankPage = document.createElement("div");
      blankPage.className = "tile is-parent is-4 recipe-page"
      document.getElementById("recipe-posts").appendChild(blankPage);
    }

    // Based on the page value, rotate the images in opposite directions
    if ((catalog1 + 4) % 4 == 0) {
      page1.querySelector('.image').style.transform= "rotate(355deg)";
      if (page2) {
        page2.querySelector('.image').style.transform= "rotate(5deg)";
      }
    } else if ((catalog1 + 4) % 4 == 2) {
      page1.querySelector('.image').style.transform= "rotate(5deg)";
      if (page2) {
        page2.querySelector('.image').style.transform= "rotate(355deg)";
      }
    };
  };
}

// eventlisteners
document
  .querySelector('.pagination-next')
  .addEventListener('click', nextPage);  

document
  .querySelector('.pagination-previous')
  .addEventListener('click', previousPage);  