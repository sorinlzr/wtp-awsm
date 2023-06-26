function getCurrentUser() {
    const userId = sessionStorage.getItem('userId');
    return fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(data => data.data)
        .catch(error => {
            console.error('Error fetching current user:', error);
        });
}


window.addEventListener('load', () => {
    const userContainer = document.getElementById('username-img');
    userContainer.innerHTML = '';
    const userPostContainer = document.getElementById('userAvatar');
    userPostContainer.innerHTML = '';
    
    getCurrentUser().then(currentUser => {
        const userElement = document.createElement('div');
        userElement.innerHTML = `
        <span class="account-user">
            <img src="${currentUser.avatar}" alt="userAvatar" class="account-profile">
        </span>
        <span class="account-user">
            ${currentUser.username}
        </span>
         `;

        userContainer.appendChild(userElement);

        userPostContainer.innerHTML = `
            <img src="${currentUser.avatar}" alt="userAvatar" class="account-profile">
         `;
    }).catch(error => {
        console.error('Error rendering user avatar:', error);
    });
});
