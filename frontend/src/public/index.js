
// Function to handle the login button click
document.getElementById('loginButton').addEventListener('click', function() {
    // Send a fetch request to the /login endpoint
    fetch('/login')
      .then(function(response) {
        if (response.ok) {
          // On success, redirect to the login page
          window.location.href = '/login';
        }
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  });
  
  // Function to handle the register button click
  document.getElementById('registerButton').addEventListener('click', function() {
    // Send a fetch request to the /register endpoint
    fetch('/register')
      .then(function(response) {
        if (response.ok) {
          // On success, redirect to the register page
          window.location.href = '/register';
        }
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  });
  