document.addEventListener('DOMContentLoaded', () => {
  // prevent page reload on enter keypress
  document.addEventListener('keypress', function(event){
      if (event.which == '13') {
        event.preventDefault();
      }
  });

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
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .close-modal') || []).forEach(($close) => {
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
});

// login handler
const loginFormHandler = async (event) => {
  event.preventDefault();

  // define values from elements
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // ensure that all required fields are provided
  if (email && password) {
    // all POST request
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    // wait for response to complete and then reload page
    const loggedIn = await response.json().then(data => (
      document.location.replace('/my-kitchen')
    ));

    // on success, direct to my-kitchen page
    if (response.ok) {
      document.location.replace('/my-kitchen');
    } else {
      alert("Error: Account not found. \n Sign up or try again.");
    }
  }
};

// signup handler
const signupFormHandler = async (event) => {
  event.preventDefault();

  // define values from element
  const email = document.querySelector('#email-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // ensure that all required fields are provided
  if (email && username && password) {
    // call POST request
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // on success, direct to my-kitchen page
    if (response.ok) {
      document.location.replace('/my-kitchen');
    } else {
      alert(response.statusText);
    }
  }
};

// eventlisteners
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('#signup')
  .addEventListener('click', signupFormHandler);