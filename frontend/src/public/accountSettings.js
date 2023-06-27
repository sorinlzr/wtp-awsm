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
    displayAccountDetails(currentUser);

  }).catch(error => {
    console.error('Error rendering for current user:', error);
  });;
}
// TODO this is not working
function editAccountDetails() {
  const accountDetails = document.getElementById("account-settings-container");
  accountDetails.innerHTML = `
    <div class="user-box">
      <input type="text" name="" required="" id="username">
      <label>Username</label>
    </div>

    <div class="user-box">
      <input type="Firstname" name="" required="" id="firstname">
      <label>Firstname</label>
    </div>

    <div class="user-box">
      <input type="Lastname" name="" required="" id="lastname">
      <label>Lastname</label>
    </div>

    <div class="user-box">
      <input type="E-mail" name="" required="" id="email">
      <label>E-mail</label>
    </div>
    <div class="user-box">
      <input type="password" name="" required="" id="password" autocomplete="new-password">
      <label>Password</label>
    </div>
    <div class="user-box dropdown">
      <label>Language</label>
      <select id="language" required title="language">
        <option value="en" selected>English</option>
        <option value="es">Español</option>
        <option value="de">Deutsch</option>
        <option value="it">Italiano</option>
        <option value="fr">Francais</option>
      </select>
    </div>
  `
}

// TODO this is not working
function displayAccountDetails(user) {
  const accountDetails = document.getElementById("account-settings-container");
  accountDetails.innerHTML = `
    <div class="user-box">
      ${user.username}
    </div>

    <div class="user-box">
      ${user.fistname}
    </div>

    <div class="user-box">
      <input type="Lastname" name="" required="" id="lastname">
      <label>Lastname</label>
    </div>

    <div class="user-box">
      <input type="E-mail" name="" required="" id="email">
      <label>E-mail</label>
    </div>
    <div class="user-box">
      <input type="password" name="" required="" id="password" autocomplete="new-password">
      <label>Password</label>
    </div>
    <div class="user-box dropdown">
      <label>Language</label>
      <select id="language" required title="language">
        <option value="en" selected>English</option>
        <option value="es">Español</option>
        <option value="de">Deutsch</option>
        <option value="it">Italiano</option>
        <option value="fr">Francais</option>
      </select>
    </div>
  `
}
