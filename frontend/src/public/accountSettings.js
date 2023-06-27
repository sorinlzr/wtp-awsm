function getCurrentUser() {
  const userId = sessionStorage.getItem('userId');
  return fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(data => data.data)
    .catch(error => {
      console.error('Error fetching current user:', error);
    });
}


function switchToAccountSettings() {
  console.log('Switch to account called');
  const userId = sessionStorage.getItem('userId');
  console.log('userId:', userId);

  getCurrentUser().then(currentUser => {

    console.log(currentUser);
    window.location.href = '/accountSettings';

    //TODO handle here populating the account settings

  }).catch(error => {
    console.error('Error rendering for current user:', error);
  });;
}
