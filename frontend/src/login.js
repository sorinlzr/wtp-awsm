document.getElementById('loginUserForm').addEventListener('submit', loginUser);

window.addEventListener('load', () => {
    // Get the success message from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const successMessage = urlParams.get('success');

    // Check if the success message should be displayed
    const displaySuccess = sessionStorage.getItem('successMessage');
    if (successMessage === 'login_success' && displaySuccess) {
        const successElement = document.getElementById('successMessage');
        successElement.textContent = 'Successfully logged in.'; // Customize the success message
        successElement.style.display = 'block'; // Make the success message visible

        // Set the flag to indicate that the success message has been displayed
        sessionStorage.setItem('successMessage', false);
        console.log("in the if of the script");
        sessionStorage.removeItem('successMessage');
    }
    else {
        // Hide the success message if it shouldn't be displayed
        const successElement = document.getElementById('successMessage');
        successElement.style.display = 'none';
        console.log("in the else of the script");
        sessionStorage.removeItem('successMessage');
    }
});


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
        .then(response => response.json())
        .then(data => {
            console.log('User logged in successfully:', data);
            sessionStorage.setItem('loginSuccessMessage', true);
            window.location.href = '/home.html?success=login_success';
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
