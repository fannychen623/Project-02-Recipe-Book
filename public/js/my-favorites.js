document.addEventListener('DOMContentLoaded', () => {
  // if less than 6 recipes exist, set margin bottom to push footer to the bottom of the page
  if (document.querySelectorAll('.card').length < 6) {
    document.getElementById("my-favorites").style.marginBottom = "30%" ;
  }
});