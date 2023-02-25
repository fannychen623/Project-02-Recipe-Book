document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("1").style.visibility= "visible" ;
  document.getElementById("2").style.visibility= "visible" ;
}, false);

function nextPage() {
  const currentPage = document.getElementById("current-page").value
  const lastPage = document.getElementById("last-page").value

  if (currentPage < lastPage) {
    currentPage++;
    document.getElementById("current-page").textContent = currentPage;
    const catalog2 = currentPage * 2
    const catalog1 = catalog2 - 1

    if (lastPage % currentPage == 0) {
      document.querySelector('.recipe-page').style.visibility= "hidden";
      document.getElementById("'" + catalog1 + "'").style.visibility= "visible";
      document.getElementById("'" + catalog1 + "'").style.visibility= "visible";
    }
  };

  if (4 % catalog1 == 0) {
    document.querySelectorAll('#' + catalog1 + '  > .image').style.transform= "rotate(353deg)";
    document.querySelectorAll('#' + catalog2 + '  > .image').style.transform= "rotate(7deg)";
  } else if (4 % catalog1 == 1) {
    document.querySelectorAll('#' + catalog1 + '  > .image').style.transform= "rotate(7deg)";
    document.querySelectorAll('#' + catalog2 + '  > .image').style.transform= "rotate(353deg)";
  };
}

function previousPage() {
  const currentPage = document.getElementById("current-page").value
  const lastPage = document.getElementById("last-page").value

  if (currentPage > 1) {
    currentPage--;
    document.getElementById("current-page").textContent = currentPage;
    const catalog2 = currentPage * 2
    const catalog1 = catalog2 - 1

    if (lastPage % currentPage == 0) {
      document.querySelector('.recipe-page').style.visibility= "hidden";
      document.getElementById("'" + catalog1 + "'").style.visibility= "visible";
      document.getElementById("'" + catalog1 + "'").style.visibility= "visible";
    }
  };

  if (4 % catalog1 == 0) {
    document.querySelectorAll('#' + catalog1 + '  > .image').style.transform= "rotate(353deg)";
    document.querySelectorAll('#' + catalog2 + '  > .image').style.transform= "rotate(7deg)";
  } else if (4 % catalog1 == 1) {
    document.querySelectorAll('#' + catalog1 + '  > .image').style.transform= "rotate(7deg)";
    document.querySelectorAll('#' + catalog2 + '  > .image').style.transform= "rotate(353deg)";
  };
}

document
  .querySelector('.pagination-next')
  .addEventListener('click', nextPage);  

document
  .querySelector('.pagination-previous')
  .addEventListener('click', previousPage);  