document.getElementById('registerUser').addEventListener('submit', registerUser);

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
            // Handle the success response here, e.g., show a success message to the user
        })
        .catch(error => {
            console.error('Error registering user:', error);
            // Handle the error here, e.g., display an error message to the user
        });
}
