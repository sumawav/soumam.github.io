const segLen = 8
const tR = document.getElementById("top-row")
const bR = document.getElementById("bottom-row")

// the all off character is a !
const cleanSpaces = (text) => {
    return text.replace(/\s/g, "!")
}

const startScroll = (text, top) => {
    let idx = 0;
    const scroll = setInterval(() => {
        let sampleText = text.slice(idx, idx + segLen)
        let row = top ? tR : bR
        row.innerText = cleanSpaces(sampleText)
        idx++
        if (idx > text.length){
            clearInterval(scroll)
            startScroll(text, top)
        }
    }, 300);     
}

const setScrollText = (text, top) => {
    if (text.length < segLen + 1){
        let row = top ? tR : bR
        row.innerText = cleanSpaces(text)
        return
    }
    startScroll(text, top)
}