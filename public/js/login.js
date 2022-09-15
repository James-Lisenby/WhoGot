const loginFormHandler = async (event) => {
  event.preventDefault();

  // stores values from email and password elements
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // tests if both email and password were given
  if (email && password) {
    // stores email and password in json format and sends to server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // if 200 status code is sent back, send user to homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      // if login failed, send message
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// runs loginFormHandler if login form submitted
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// runs signupFormHandler if signup form submitted
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
