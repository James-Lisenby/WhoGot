const signupFormHandler = async (event) => {
    event.preventDefault();

    console.log("signupFormHandler was called");
    debugger;
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    console.log(username);
    debugger;

    // Takes the email input and runs it throught the validator function to make sure it is an email.
  
    if (username && email && password) {
      // The validated Email is ran through instead.
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response);
      debugger;

      if (response.ok) {
        document.location.replace('/new-user');
        console.log("url replaced");
        debugger;

      } else {
        alert('Failed to sign up.');
      }
    }
  };
  // runs signupFormHandler if signup form submitted
document
.querySelector('#signup')
.addEventListener('click', signupFormHandler);

