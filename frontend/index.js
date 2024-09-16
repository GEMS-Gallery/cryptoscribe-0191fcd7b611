import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const newPostBtn = document.getElementById('newPostBtn');
    const postForm = document.getElementById('postForm');
    const blogForm = document.getElementById('blogForm');
    const postsSection = document.getElementById('posts');

    newPostBtn.addEventListener('click', () => {
        postForm.style.display = postForm.style.display === 'none' ? 'block' : 'none';
    });

    blogForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const body = document.getElementById('body').innerHTML;

        await backend.addPost(title, body, author);
        blogForm.reset();
        document.getElementById('body').innerHTML = '';
        postForm.style.display = 'none';
        await displayPosts();
    });

    async function displayPosts() {
        const posts = await backend.getPosts();
        postsSection.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <div class="post-meta">By ${post.author} on ${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</div>
                <div class="post-body">${post.body}</div>
            `;
            postsSection.appendChild(postElement);
        });
    }

    await displayPosts();
});
