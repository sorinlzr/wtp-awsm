document.getElementById('loginUserForm').addEventListener('submit', loginUser);


function loginUser(event) {
    console.log('loginUser called');

    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Create user object
    const user = {
        username,
        password
    };

    console.log('sending post login');
    // Send POST request to the backend.
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error('Incorrect password or username');
            } else if (response.status === 404) {
                throw new Error('Username not found');
            } else {
                throw new Error('An error occurred during login');
            }
        })
        .then(json => {
            console.log('User logged in successfully:', json);
            console.log('Userid: ', json.data.id);
            sessionStorage.setItem('loginSuccessMessage', true);
            sessionStorage.setItem('userId', json.data.id);
            window.location.href = '/home?success=login_success';
            // Handle the success response here, e.g., show a success message to the user
        })
        .catch(error => {
            console.error('Error logging in user:', error);
            const errorMessage = document.getElementById('errorMessage');
            if (errorMessage) {
                errorMessage.textContent = 'Logging in failed. Please try again.';
                errorMessage.style.display = 'block'; // Make the error message visible
            }
            sessionStorage.setItem('errorMessage', 'Logging in failed. Please try again.');
        });
}

function handleRegisterButtonClick() {
    console.log('Register button clicked');
    fetch('/register')
        .then(function (response) {
            if (response.ok) {
                window.location.href = '/register';
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}
