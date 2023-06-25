function switchToAccountSettings() {
    console.log('Switch to account called');
    const userId = sessionStorage.getItem('userId');
    console.log('userId:', userId);
  
    fetch(`/accountSettings/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error('Could not retrieve the user profile');
        } else {
          throw new Error('An error occurred during the request');
        }
      })
      .then(json => {
        console.log('UserId:', json.data.id);
        sessionStorage.setItem('userId', json.data.id); // Update the userId in sessionStorage
        window.location.href = '/accountSettings.html'; // Navigate to accountSettings.html
      })
      .catch(error => {
        console.error('Could not retrieve the user profile.', error);
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
          errorMessage.textContent = 'Retrieving user profile failed. Please try again.';
          errorMessage.style.display = 'block';
        }
        sessionStorage.setItem('errorMessage', 'Retrieving user profile failed. Please try again.');
      });
  }
  