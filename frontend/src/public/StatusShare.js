document.getElementById('status-share').addEventListener('click', shareStatus);

function shareStatus(event) {
  event.preventDefault();

  const text = document.getElementById('post-text').value;
  const userId = sessionStorage.getItem('userId');

  const data = {
    text: text,
    user: userId,
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
      fetchAndRenderPosts(users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
}

function fetchAndRenderPosts(users) {
  fetch('/api/posts')
    .then(response => response.json())
    .then(data => {
      renderPosts(data.data, users);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
}

function getCurrentUser() {
  const userId = sessionStorage.getItem('userId');
  return fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(data => data.data)
    .catch(error => {
      console.error('Error fetching current user:', error);
    });
}

function renderPosts(posts, users) {
  const container = document.getElementById('posts-container');

  // Clear the existing posts
  container.innerHTML = '';

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  getCurrentUser().then(currentUser => {

    posts.forEach(post => {
      const postElement = document.createElement('div');

      postElement.className = 'album box';

      // Find the user object based on the user ID in the post
      const postingUser = users.find(u => u._id === post.user);

      const userLanguage = currentUser.language;
      const textLanguage = post.textLanguage;

      if (postingUser) {
        let translationText = '';
        if (userLanguage !== textLanguage) {
          const languageMap = {
            en: 'English',
            es: 'Español',
            de: 'Deutsch',
            it: 'Italiano',
            fr: 'Francais'
          };
          const translatedLanguage = languageMap[userLanguage] || '';
          translationText = `Translate to ${translatedLanguage}`;
        }

      postElement.innerHTML = `
      <div class="status-main">
        <img src="${postingUser.avatar}" class="status-img" alt="user avatar"/>
        <div class="album-detail">
          <div class="album-title"><strong>${postingUser.username}</strong> create new <span>post</span></div>
          <div class="album-date">${post.date}</div>
        </div>
      </div>
      <div class="album-content" id="postText-${post._id}">
        ${post.text}
      </div>
      <div class="album-actions">
        ${post.labels.map(label => `<button class="hashtag-label">${label.label}</button>`).join('')}
      </div>
      <div class="album-actions">
        <div class="button-container">
        <div class="left-buttons">
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
        <button class="translate-button" id="translate-${post._id}" data-text="${post.text}" data-source="${textLanguage}" data-target="${userLanguage}">
          ${translationText}    
        </button>
      </div>
      <div class="right-buttons">
         ${
            // Show the edit and delete buttons only if the current user is the owner of the post
            post.user === currentUser._id
              ? `
              <a href="#" class="album-action" id="editButton" onclick="editPostText('${post._id}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brush" viewBox="0 0 16 16">
                <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"/>
              </svg>Edit
            </a>
            <a href="#" onclick="deletePost('${post._id}')" class="album-action delete-button" data-post-id="${post._id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bucket" viewBox="0 0 16 16">
                <path d="M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5zm1.005 0a4.5 4.5 0 0 1 8.945 0H3.527zm9.892 1-1.286 8.574a.5.5 0 0 1-.494.426H4.36a.5.5 0 0 1-.494-.426L2.58 6h10.838z"/>
              </svg>Delete
            </a>
              `
              : ''
          }
      </div>
    </div>
  </div>
</div>
`;

        container.appendChild(postElement);

        // Attach onClick event to translation link
        const translationAnchor = document.getElementById(`translate-${post._id}`);
        translationAnchor.addEventListener('click', translatePost);
      }
    });
  }).catch(error => {
    console.error('Error rendering for current user:', error);
  });
}

function translatePost(event) {
  event.preventDefault();

  const translationAnchor = event.target;
  const text = translationAnchor.getAttribute('data-text');
  const sourceLanguage = translationAnchor.getAttribute('data-source');
  const targetLanguage = translationAnchor.getAttribute('data-target');

  const data = {
    text: text,
    sourceLanguage: sourceLanguage,
    targetLanguage: targetLanguage
  };

  fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      const translatedText = data.translatedText;

      // Update the post content with the translated text
      const albumContent = translationAnchor.closest('.album').querySelector('.album-content');
      albumContent.textContent = translatedText;

      // Hide the translation link
      translationAnchor.style.display = 'none';
    })
    .catch(error => {
      console.error('Error translating post:', error);
    });
}

// Call fetchUsers() when the page loads
window.addEventListener('load', fetchUsers);

function deletePost(postId) {
  console.log(`delete post called with post id: ${postId}`)
  fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        console.log('Post deleted successfully');
        location.reload();
      } else {
        console.error('Error deleting post:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting post:', error);
    });
}

function editPostText(postId) {
  const postTextContainer = document.getElementById(`postText-${postId}`);

  // Get the current text content
  const currentText = postTextContainer.textContent.trim();

  // Create a textarea element
  const textarea = document.createElement('textarea');
  textarea.value = currentText;
  textarea.className = 'edit-textarea';

  // Create the Save and Cancel buttons
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.className = 'edit-button';
  saveButton.addEventListener('click', () => {
    const editedPostText = textarea.value.trim();
    // const postId = getPostIdFromElement(postTextContainer);

    // Call the /api/posts/:id endpoint with a PUT request
    fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: editedPostText })
    })
      .then(response => {
        if (response.ok) {
          console.log('Post text updated successfully');

          // Update the post content in the DOM
          postTextContainer.textContent = editedPostText;

          // Remove the textarea and buttons
          postTextContainer.removeChild(textarea);
          postTextContainer.removeChild(saveButton);
          postTextContainer.removeChild(cancelButton);
        } else {
          console.error('Error updating post text:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error updating post text:', error);
      });
  });

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.className = 'edit-button';
  cancelButton.addEventListener('click', () => {
    // Restore the original content
    postTextContainer.textContent = currentText;
  });

  // Clear the postTextContainer and add the textarea and buttons
  postTextContainer.innerHTML = '';
  postTextContainer.appendChild(textarea);
  postTextContainer.appendChild(saveButton);
  postTextContainer.appendChild(cancelButton);
}

function getPostIdFromElement(element) {
  const postIdAttribute = 'data-post-id';

  // Traverse up the DOM to find the nearest ancestor with the data-post-id attribute
  while (element && !element.hasAttribute(postIdAttribute)) {
    element = element.parentElement;
  }

  if (element) {
    return element.getAttribute(postIdAttribute);
  }

  return null;
}

