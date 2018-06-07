const gamesLink = document.getElementById("games")
const blogLink = document.getElementById("blog")
const aboutLink = document.getElementById("about")
const title = document.getElementById("title")

const converter = new showdown.Converter()

const addToPage = (element, destination) => {
    destination = destination || document.getElementById("view")
    destination.appendChild(element)
}

const createBlogPostContainer = (text) => {
    const div = document.createElement("div")
    div.classList.add("blogpost")
    div.innerHTML = converter.makeHtml(text)
    return div
}

const fetchBlogPost = (mdFileName) => {
    let pathPre = "pages/"
    return fetch(pathPre + mdFileName, {
        method: "GET"
    })
    .then((data) => data.text())
}

const fetchBlogPosts = (filesArray) => {
    let promises = filesArray.map((e) => {
        return fetchBlogPost(e)
    })
    return Promise.all(promises)
}

const clearView = (destination) => {
    destination = destination || document.getElementById("view")
    destination.innerHTML = ""
}

const changeTitle = (text) => { title.innerHTML = text || "SOUMA'S STUFF"}

const loadPost = (fileName, noclear) => {
    if (!noclear)
        clearView()
    fetchBlogPost(fileName)
        .then(createBlogPostContainer)
        .then(addToPage)
}

const loadPosts = (filesArray, noclear) => {
    if (!noclear)
        clearView()
    fetchBlogPosts(filesArray)
        .then((text) => {
            text.forEach((e) => {
                addToPage(createBlogPostContainer(e))
            })
        })
}

const init = () => {
    gamesLink.addEventListener("click", (e) => {
        loadPost("games.md")
        changeTitle("SOUMA'S GAMES")
    })
    aboutLink.addEventListener("click", (e) => {
        loadPost("about.md")
        changeTitle("ABOUT SOUMA")
    })
    blogLink.addEventListener("click", (e) => {
        loadPost("startblog.md")
        changeTitle("SOUMA'S BLOG")
    })
}

// START HERE
window.addEventListener("load", () => { 
    init()
    loadPost("games.md");
    // loadPosts(["about.md", "games.md", "startblog.md"])
})

