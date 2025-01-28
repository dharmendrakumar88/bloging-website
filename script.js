let posts = []; // Array to store posts
let users = []; // Array to store users
let currentUser = null; // Current logged-in user

// Function to add a new user
function addUser() {
    const username = document.getElementById('username').value;
    if (username.trim() !== '') {
        users.push({ username, posts: [] });
        currentUser = username;
        alert(`${username} added as a new user!`);
        document.getElementById('username').value = ''; // Clear the input
    } else {
        alert('Please enter a username.');
    }
}

// Function to add a new post
function addPost() {
    if (currentUser === null) {
        alert('Please create a user first.');
        return;
    }

    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    if (title.trim() === '' || content.trim() === '') {
        alert('Please fill out both title and content.');
        return;
    }

    const post = { id: Date.now(), title, content, username: currentUser };
    posts.push(post);
    users.find(user => user.username === currentUser).posts.push(post);
    displayPosts();
    clearPostInputs();
}

// Function to clear post input fields
function clearPostInputs() {
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
}

// Function to display all posts
function displayPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>Posted by: ${post.username}</small>
            <br>
            <button onclick="deletePost(${post.id})">Delete Post</button>
            <button onclick="editPost(${post.id})">Edit Post</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Function to delete a post
function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    users.forEach(user => {
        user.posts = user.posts.filter(post => post.id !== postId);
    });
    displayPosts();
}

// Function to edit a post
function editPost(postId) {
    const postToEdit = posts.find(post => post.id === postId);

    if (postToEdit) {
        const newTitle = prompt('Edit Title:', postToEdit.title);
        const newContent = prompt('Edit Content:', postToEdit.content);

        if (newTitle && newContent) {
            postToEdit.title = newTitle;
            postToEdit.content = newContent;
            displayPosts();
        }
    }
}
