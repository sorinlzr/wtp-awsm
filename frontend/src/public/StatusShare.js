document.getElementById('status-share').addEventListener('click', shareStatus);

function shareStatus(event) {
  event.preventDefault();

  const text = document.getElementById('post-text').value;

  const userId = sessionStorage.getItem('userId');
  console.log('userId:', userId);

  const data = {
    text: text,
    user: userId,
    nonexisting: 'plm'
  };

  fetch('/api/posts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Post created successfully:', data);
      location.reload();
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
}

function fetchUsers() {
  fetch('/api/users')
    .then(response => response.json())
    .then(data => {
      users = data.data;
      fetchAndRenderPosts();
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
}

function fetchAndRenderPosts() {
  fetch('/api/posts')
    .then(response => response.json())
    .then(data => {
      renderPosts(data.data);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
}

function renderPosts(posts) {
  const container = document.getElementById('posts-container');

  // Clear the existing posts
  container.innerHTML = '';

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'album box';

    // Find the user object based on the user ID in the post
    const user = users.find(u => u._id === post.user);

    postElement.innerHTML = `
      <div class="status-main">
        <img src="https://images.genius.com/2326b69829d58232a2521f09333da1b3.1000x1000x1.jpg" class="status-img" />
        <div class="album-detail">
          <div class="album-title"><strong>${user.username}</strong> create new <span>post</span></div>
          <div class="album-date">${post.date}</div>
        </div>
      </div>
      <div class="album-content">${post.text}</div>
      <div class="album-actions">
        ${post.labels.map(label => `<button class="hashtag-label">${label.label}</button>`).join('')}
      </div>
      <div class="album-actions">
        <a href="#" class="album-action">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
          </svg>
          87
        </a>
        <a href="#" class="album-action">
          <svg stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
           20
        </a>
        <a href="#" class="album-action">
          <svg stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1" viewBox="0 0 24 24">
            <path d="M17 1l4 4-4 4" />
            <path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4" />
            <path d="M21 13v2a4 4 0 01-4 4H3" />
          </svg>
          13
        </a>
        <a href="#" class="album-action">
          Translate to German.      
        </a>
      </div>
    `;

    container.appendChild(postElement);
  });
}

// Call fetchUsers() when the page loads
window.addEventListener('load', fetchUsers);
