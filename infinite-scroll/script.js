const baseUrl = "https://jsonplaceholder.typicode.com"

const postsContainer = document.getElementById('postsContainer')
const loading = document.getElementById('loader')
const filter = document.getElementById('filter')

const limit = 10
let page = 1

const getPosts = async () => {
    const res = await fetch(`${baseUrl}/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json()
    return data
} 

const showPosts = async () => {
    const posts = await getPosts()

    posts.forEach(post => {
        const postEl = document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `
        postsContainer.appendChild(postEl)
    })
    page++
    filterPosts()
    loading.classList.remove('show')
}

const showLoading = () => {
    loading.classList.add('show')

}

const filterPosts = () => {
    const term = filter.value.toUpperCase()
    const posts = document.querySelectorAll('.post')

    if (term.length > 2) {
        posts.forEach(post => {
            const title = post.querySelector('.post-title').innerText.toUpperCase()
            const body = post.querySelector('.post-body').innerText.toUpperCase()

            if (title.indexOf(term) > -1 || body.indexOf(term) > -1){
                post.style.display = 'flex'
            } else {
                post.style.display = 'none'
            }
        })
    } else {
        posts.forEach(post => post.style.display = 'flex')
    }
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading()
        setTimeout(showPosts, 300)
    }
})

showPosts()
filter.addEventListener('input', filterPosts)
