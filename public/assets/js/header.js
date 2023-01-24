const recentsList = document.getElementById('recent-posts-list')

getRecents()

async function getRecents() {
    const res = await fetch("/api/getRecents")
    const recents = await res.json();
    for(let post of recents) {
        const li = document.createElement('li')
        const link = document.createElement('a')
        link.href = `/post/${post.titleUrl}`
        link.innerText = post.title
        li.appendChild(link)
        recentsList.appendChild(li)
    }
}