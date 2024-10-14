document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts');

    // Load posts from local storage if available
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Function to render posts on the page
    function renderPosts() {
        postsContainer.innerHTML = ''; // Clear current posts
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.content}</p>
                <span class="post-date">Posted on: ${post.date}</span>
                <hr>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Function to add a new post
    function addPost(title, content) {
        const date = new Date().toLocaleString(); // Get the current date and time
        const newPost = { title, content, date };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts)); // Save to local storage
        renderPosts(); // Update the post list
    }

    // Handle form submission
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        addPost(title, content); // Add the new post

        // Clear the form after submission
        postForm.reset();
    });

    // Initial render
    renderPosts();
});