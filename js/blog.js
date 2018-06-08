const gamesLink = document.getElementById("games")
const blogLink = document.getElementById("blog")
const aboutLink = document.getElementById("about")
const title = document.getElementById("title")


// Extension
showdown.extension('targetlink', function () {
    return [{
        type: 'html',
        regex: /(<a [^>]+?)(>.*<\/a>)/g,
        replace: '$1 target="_blank"$2'
    }];
});

const converter = new showdown.Converter({
    // extensions: ['targetlink'],
    strikethrough: true
})

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

const clearView = () => {
    destination = document.getElementById("view")
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


function locationHashChanged() {
    if (!location.hash)
        return false
    switch (location.hash){
        case "#blog":
            loadPosts(["spacecats-Intro.md", "startblog.md"])
            break
        default:
            hashTravel()
    }
    return true
}

window.onhashchange = locationHashChanged;

const hashTravel = () => {
        loadPost(location.hash.slice(1) + ".md")
}

const init = () => {
    gamesLink.addEventListener("click", (e) => {
        changeTitle("SOUMA'S GAMES")
        loadPost("games.md")
    })
    blogLink.addEventListener("click", (e) => {
        changeTitle("SOUMA'S BLOG")
        loadPosts(["spacecats-Intro.md", "startblog.md"])
    })
    aboutLink.addEventListener("click", (e) => {
        changeTitle("SOUMA'S ABOUT")
        loadPost("about.md")
    })
}

// START HERE
window.addEventListener("load", () => { 
    init()
    if( !locationHashChanged() )
        loadPost("games.md");
})

