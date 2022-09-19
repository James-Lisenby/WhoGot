import validator from 'email-validator'
validator.validate('test@email.com');

const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    const validatedEmail = validator.validate(email);
    // Takes the email input and runs it throught the validator function to make sure it is an email.
  
    if (username && validatedEmail && password) {
      // The validated Email is ran through instead.
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, validatedEmail, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  // runs signupFormHandler if signup form submitted
document
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);

