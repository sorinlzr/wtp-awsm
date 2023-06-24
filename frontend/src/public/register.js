document.getElementById('registerUser').addEventListener('submit', registerUser);

window.addEventListener('load', () => {
    const errorMessage = document.getElementById('errorMessage');
    const storedErrorMessage = sessionStorage.getItem('errorMessage');
    if (storedErrorMessage) {
        errorMessage.style.display = 'none';
        sessionStorage.removeItem('errorMessage');
    }
});

function registerUser(event) {
    console.log('register user called');
    console.log(document.getElementById('firstname'));

    event.preventDefault();

    // Get form input values
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Create user object
    const user = {
        firstname,
        lastname,
        email,
        username,
        password
    };

    console.log(user);

    // Send POST request to the backend
    fetch('/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            console.log('User registered successfully:', data);
            sessionStorage.setItem('successMessage', true);
            window.location.href = '/login?success=registration_success';
            // Handle the success response here, e.g., show a success message to the user
        })
        .catch(error => {
            console.error('Error registering user:', error);
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = 'Registration failed. Please try again.';
            errorMessage.style.display = 'block'; // Make the error message visible
            sessionStorage.setItem('errorMessage', 'Registration failed. Please try again.');
        });
}

function handleLoginButtonClick() {
    fetch('/login')
      .then(function(response) {
        if (response.ok) {
          window.location.href = '/login';
        }
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  }
