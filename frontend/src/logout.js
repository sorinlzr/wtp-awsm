// Add an event listener to the logout button or link.
// document.getElementById('logoutForm').addEventListener('click', logoutUser);

function logoutUser() {
  // Send a GET request to the logout endpoint.
  fetch('/api/auth/logout', {
    method: 'GET',
    withCredentials: true,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('User logged out successfully:', data);
      sessionStorage.setItem('logoutSuccessMessage', true);
      window.location.href = '/index.html';
    })
    .catch(error => {
      console.error('Error logging out user:', error);
      sessionStorage.setItem('errorMessage', 'Logging out failed. Please try again.');
    });
}
