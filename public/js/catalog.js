document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("0").style.display= "block" ;
  document.getElementById("1").style.display= "block" ;
  const page1 = document.getElementById("0");
  const page2 = document.getElementById("1");
  page1.querySelector('.image').style.transform= "rotate(353deg)";
  if (page2) {
    page2.querySelector('.image').style.transform= "rotate(7deg)";
  }
  document.getElementById("last-page").innerHTML = Math.ceil(document.querySelectorAll('.recipe-page').length/2);
}, false);

function nextPage() {
  let currentPage = Number(document.getElementById("current-page").innerHTML)
  let lastPage = Number(document.getElementById("last-page").innerHTML)

  if (currentPage < lastPage) {
    currentPage++;
    document.getElementById("current-page").textContent = currentPage;

    const catalog2 = (currentPage * 2) - 1
    const catalog1 = catalog2 - 1
    console.log((catalog1 + 4) % 4)
    const page1 = document.getElementById(catalog1);
    const page2 = document.getElementById(catalog2);

    document.querySelectorAll('.recipe-page').forEach(function(el) {
      el.style.display = "none";
    });
    page1.style.display= "block";
    if (page2) {
      page2.style.display= "block";
    } else {
      const blankPage = document.createElement("div");
      blankPage.className = "tile is-parent is-4 recipe-page"
      document.getElementById("recipe-posts").appendChild(blankPage);
    }

    if ((catalog1 + 4) % 4 == 0) {
      page1.querySelector('.image').style.transform= "rotate(353deg)";
      if (page2) {
        page2.querySelector('.image').style.transform= "rotate(7deg)";
      }
    } else if ((catalog1 + 4) % 4 == 2) {
      page1.querySelector('.image').style.transform= "rotate(7deg)";
      if (page2) {
        page2.querySelector('.image').style.transform= "rotate(353deg)";
      }
    };
  };
}

function previousPage() {
  let currentPage = Number(document.getElementById("current-page").innerHTML)

  if (currentPage > 1) {
    currentPage--;
    document.getElementById("current-page").textContent = currentPage;

    const catalog2 = (currentPage * 2) - 1
    const catalog1 = catalog2 - 1
    console.log((catalog1 + 4) % 4)
    const page1 = document.getElementById(catalog1);
    const page2 = document.getElementById(catalog2);

    document.querySelectorAll('.recipe-page').forEach(function(el) {
      el.style.display = "none";
    });
    page1.style.display= "block";
    if (page2) {
      page2.style.display= "block";
    } else {
      const blankPage = document.createElement("div");
      blankPage.className = "tile is-parent is-4 recipe-page"
      document.getElementById("recipe-posts").appendChild(blankPage);
    }

    if ((catalog1 + 4) % 4 == 0) {
      page1.querySelector('.image').style.transform= "rotate(353deg)";
      if (page2) {
        page2.querySelector('.image').style.transform= "rotate(7deg)";
      }
    } else if ((catalog1 + 4) % 4 == 2) {
      page1.querySelector('.image').style.transform= "rotate(7deg)";
      if (page2) {
        page2.querySelector('.image').style.transform= "rotate(353deg)";
      }
    };
  };
}

document
  .querySelector('.pagination-next')
  .addEventListener('click', nextPage);  

document
  .querySelector('.pagination-previous')
  .addEventListener('click', previousPage);  