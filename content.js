function createCountElement(text) {
    const count_number = document.createElement("div")
    count_number.id = "count_number"
    count_number.innerText = "文字数: " + countLetter(text)

    const non_blank_count_number = document.createElement("div")
    non_blank_count_number.id = "non_blank_count_number"
    non_blank_count_number.innerText = "空白なしの文字数: " + countNonBlankLetter(text)
    return {count_number, non_blank_count_number}
}

function countLetter(text) {
    const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
    return [...segmenter.segment(text)].length;
}

function countNonBlankLetter(text) {
    return countLetter(text.replace(/\s+/g, ""))
}

const target_div = document.querySelector('body > div.VIpgJd-TUo6Hb.XKSfm-L9AdLc');

const observer = new MutationObserver((mutations) => {
    memo_area = mutations[0].target.querySelector("div.IZ65Hb-TBnied.zTETae-h1U9Be-hxXJme")
    if(memo_area == null) return

    memo_text_area = memo_area.querySelector("div.IZ65Hb-s2gQvd > div.IZ65Hb-qJTHM-haAclf > div.notranslate.IZ65Hb-YPqjbf.fmcmS-x3Eknd.h1U9Be-YPqjbf")
    full_memo_text = memo_text_area.innerText
    memo_tool_bar = memo_area.querySelector("div.IZ65Hb-yePe5c")

    count_element = createCountElement(full_memo_text)
    const count_div = document.createElement("div")

    count_div.style.display = "flex"
    count_div.style.justifyContent = "space-evenly"
    count_div.style.margin = "4px 0px"

    count_div.append(count_element.count_number, count_element.non_blank_count_number)

    memo_area.append(count_div)

    memo_text_area.addEventListener("input", (e) => {
        memo_text = e.target.innerText
        count_element.count_number.innerText = "文字数: " + countLetter(memo_text)
        count_element.non_blank_count_number.innerText = "空白なしの文字数: " + countNonBlankLetter(memo_text)
        full_memo_text = memo_text
    })

    document.addEventListener('selectionchange', (e) => {
        if(e.target.getSelection().isCollapsed){
            count_element.count_number.innerText = "文字数: " + countLetter(full_memo_text)
            count_element.non_blank_count_number.innerText = "空白なしの文字数: " + countNonBlankLetter(full_memo_text)
            return
        }
        memo_text = e.target.getSelection().toString()
        count_element.count_number.innerText = "文字数: " + countLetter(memo_text)
        count_element.non_blank_count_number.innerText = "空白なしの文字数: " + countNonBlankLetter(memo_text)
    });
});

const config = {
    characterData: true,
    childList: true
};

observer.observe(target_div, config);

