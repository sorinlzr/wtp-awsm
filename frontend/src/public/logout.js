function logoutUser() {
  fetch('/api/auth/logout', {
    method: 'POST',
    withCredentials: true,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('User logged out successfully:', data);
      sessionStorage.clear()
      sessionStorage.setItem('logoutSuccessMessage', true);
      window.location.href = '/index.html';
    })
    .catch(error => {
      console.error('Error logging out user:', error);
      sessionStorage.setItem('errorMessage', 'Logging out failed. Please try again.');
    });
}
