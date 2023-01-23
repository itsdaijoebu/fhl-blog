const recentsList = document.getElementById('recent-posts-list')

getRecents()

async function getRecents() {
    const res = await fetch("/api/getRecents")
    const recents = await res.json();
    for(let post of recents) {
        console.log(post.title)
    }
}