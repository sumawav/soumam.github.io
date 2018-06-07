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
const clearView = (destination) => {
    destination = destination || document.getElementById("view")
    destination.innerHTML = ""
}
const changeTitle = (text) => { title.innerHTML = text || "SOUMA'S STUFF"}
const clickToView = (e) => {
    let fileName = e.target.getAttribute("data-postname")
    clearView()
    fetchBlogPost(fileName)
        .then(createBlogPostContainer)
        .then(addToPage)
}
const init = () => {
    gamesLink.addEventListener("click", (e) => {
        clickToView(e)
        changeTitle("SOUMA'S GAMES")
    })
    aboutLink.addEventListener("click", (e) => {
        clickToView(e)
        changeTitle("ABOUT SOUMA")
    })
    blogLink.addEventListener("click", (e) => {
        clearView()
        fetchBlog()
        changeTitle("SOUMA'S BLOG")
    })

}
// for now
const fetchBlog = () => {
    fetchBlogPost("souma.md")
        .then(createBlogPostContainer)
        .then(addToPage)
}

// START HERE
window.addEventListener("load", () => { 
    init()
    fetchBlog();
})

