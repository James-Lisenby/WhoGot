const loginFormHandler = async (event) => {
  //login from event handler with the event passed thru
  event.preventDefault(); // preventing default behavior of the form

  const email = document.querySelector('#email-login').value.trim(); //gettin the value of the email input area
  const password = document.querySelector('#password-login').value.trim(); //getting the value of the password input area

  if (email && password) {
    // if email and password are true
    const response = await fetch('/api/users/login', {
      // fetch response data from the user login post route
      method: 'POST',
      body: JSON.stringify({ email, password }), //stringify (format ) the password and return it in a readable format
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // if api response status is ok , is true
      document.location.replace('/'); // move user to the main/ profile page
    } else {
      // otherwise
      alert('Failed to log in.'); //alert client side of a failed attempt
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

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
