// request to api/users
// function and listener to handle the login submission
async function signupFormHandler(event) {
    event.preventDefault();

// post the username, email and password to the form  
const username = document.querySelector('#username-signup').value.trim();
const email = document.querySelector('#email-signup').value.trim();
const password = document.querySelector('#password-signup').value.trim();

if (username && email && password) {
  const response = await fetch('/api/users', {
    method: 'post',
    body: JSON.stringify({
      username,
      email,
      password
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(response);
  // check the response status
  if (response.ok) {
    console.log('success');
  } else {
    alert(response.statusText);
  }
 }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

// request to api/users/login
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
      const response = await fetch('/api/users/login', {
          method: 'post',
          body: JSON.stringify({
              email,
              password
          }),
          headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          alert(response.statusText);
      }
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);