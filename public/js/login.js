const loginFormHandler = async (event) => {
  event.preventDefault();

  // stores values from email and password elements
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
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

// runs loginFormHandler if login form submitted
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
