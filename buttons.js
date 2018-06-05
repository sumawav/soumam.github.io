const games = document.getElementById("games")
const blog = document.getElementById("blog")
const about = document.getElementById("about")
const burger = document.getElementById("burger")
const mobileMenu = document.getElementById("mobile-menu")

const burgerToggle = () => {
    if (mobileMenu.className === "mobile-menu header-metal hide") {
        mobileMenu.className = "mobile-menu header-metal"
        burger.className = "metal linear active"
    } else {
        mobileMenu.className = "mobile-menu header-metal hide"
        burger.className = "metal linear"
    }
}


const saveText = (() => {
    let savedText = ""
    const save = (element) => {
        savedText = element.innerText
    }
    const recall = () => {
        return savedText
    }
    return {
        save: save,
        recall: recall
    }
})()

games.addEventListener("mouseover", () => {
    saveText.save(tR)
    tR.innerText = "games"
})
games.addEventListener("mouseout", () => {
    tR.innerText = saveText.recall(tR)
})
blog.addEventListener("mouseover", () => {
    saveText.save(tR)
    tR.innerText = "blog"
})
blog.addEventListener("mouseout", () => {
    tR.innerText = saveText.recall(tR)
})
about.addEventListener("mouseover", () => {
    saveText.save(tR)
    tR.innerText = "about"
})
about.addEventListener("mouseout", () => {
    tR.innerText = saveText.recall(tR)
})