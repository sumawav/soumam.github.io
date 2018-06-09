// target link extension for Showdown
showdown.extension('targetlink', function () {
    return [{
        type: 'html',
        regex: /(<a [^>]+?)(>.*<\/a>)/g,
        replace: '$1 target="_blank"$2'
    }];
});
// create Showdown instance
const converter = new showdown.Converter({
    // extensions: ['targetlink'],
    strikethrough: true
})
// DOM Manipulation methods
const addToPage = (element, destination) => {
    destination = destination || document.getElementById("view")
    destination.appendChild(element)
    return false
}
const clearView = () => {
    destination = document.getElementById("view")
    destination.innerHTML = ""
    return false
}
const changeTitle = (text) => { 
    title.innerHTML = text || "SOUMA'S STUFF"
    return false
}

const createBlogPostContainer = (text) => {
    const div = document.createElement("div")
    div.classList.add("blogpost")
    div.innerHTML = converter.makeHtml(text)
    return div
}
// getting data
const fetchBlogPost = (mdFileName) => {
    let pathPre = "pages/"
    return fetch(pathPre + mdFileName, {
        method: "GET"
    })
    .then((data) => {
        if( data.ok)
            return data.text()
        throw new Error("Problem retrieving: " + mdFileName)
    })
    .catch((error) => {
        console.log(error)
        return ""
    })
}
const fetchBlogPosts = (filesArray) => {
    let promises = filesArray.map((e) => {
        return fetchBlogPost(e)
    })
    return Promise.all(promises)
}
// displaying data
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
        .then((posts) => {
            posts.forEach((post) => {
                if (post)
                    addToPage(createBlogPostContainer(post))
            })
        })
}
// routing/navigation
function locationHashChanged() {
    if (!location.hash)
        return false
    switch (location.hash){
        case "#blog":
            loadPosts(["spa.md", "spacecats_intro.md", "startblog.md"])
            break
        default:
        loadPost(location.hash.slice(1) + ".md")
    }
    return true
}
window.onhashchange = locationHashChanged;
const redirect = (hash) => {
    location.hash = hash
}
const redirectVerbose = (event, hash, newTitle) => {
    event.preventDefault()
    if(newTitle)
        changeTitle(newTitle)
    redirect(hash)
    window.scrollTo(0,0)
}

// initialization
const init = () => {
    const title = document.getElementById("title")
    const gamesLink = document.getElementById("games")
    const blogLink = document.getElementById("blog")
    const aboutLink = document.getElementById("about")

    gamesLink.addEventListener("click", (e) => redirectVerbose(e, "games", "SOUMA'S GAMES"))
    blogLink.addEventListener("click", (e) => redirectVerbose(e, "blog", "SOUMA'S BLOG&nbsp&nbsp&nbsp&nbsp"))
    aboutLink.addEventListener("click", (e) => redirectVerbose(e, "about", "SOUMA'S ABOUT"))
    title.addEventListener("click", (e) => {
        document.location.href="/"
        window.scrollTo(0, 0)
    })
}

// START HERE
window.addEventListener("load", () => { 
    init()
    // on first boot load games page
    if( !locationHashChanged() )
        loadPost("games.md");
})

