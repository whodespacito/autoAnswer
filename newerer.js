/*
.correct
.incorrect
*/

/*TODO 
1. add question trim DONE
2. console.log everything added to localstorage BROKEN SOMEHOW
3. mine bitcoin
4. fix bugs
5. add image support (somehow)
    >Currently just guesses the question
    >Checks for an image with querySelect("img")
    1. check for url image?????
        you can querySelect the image and get the src
        each image has a unique url (more testing required)
    2.idk what else to do
6. add word typing support (somehow except more how)
    1.check for input element and image element and maybe text??


*/


const correct = ".correct"
const incorrect = ".incorrect"
let lastWordLearn = ""

//trims the choice to just the words
function answerTrim(elm) {
    return elm.textContent.trim()
}

function questionTrim(elm) {
    return elm.textContent.replace(/[\r\n]+/g," ").trim()
}

//answers the word learn
function wordLearn() {
    if (!document.getElementById("next-btn")) return
    document.querySelector(".answer").click()
    lastWordLearn = document.querySelector(".wordform").textContent
    document.getElementById("next-btn").click()
}

//answers the word typing question given after a new given word
function lastWord() {
    var question = document.getElementById("wordspell").querySelector("p").textContent
    //checks if the question is a word remember question
    if (!document.getElementById("choice") && question !== "Spell the word you saw. It helps with later questions. For good measure, say it once aloud too!") {
        console.log("Not a last word question")
        return
    }

    //checks if lastWordLearn was stored (it should be stored)
    if (!lastWordLearn) {
        console.log("lastWordLearn is false...")
        console.log("verifying question...")

        if (question == "Spell the word you saw. It helps with later questions. For good measure, say it once aloud too!") {
            console.log("verified true")
            alert("answer unknown, skip...")
        } else {
            console.log("got false, returning")
            return
        }
    }
    document.getElementById("choice").value = lastWordLearn
    lastWordLearn = ""

}

//answers the multiple choice question (without the images)
function wordQuiz() {
    console.log("Word quiz start")
    if (!document.querySelector(".choice")) {
        console.log("couldn't find .choice, ending....")
        return
    }
    lastWordLearn = ""
    let choice = document.querySelectorAll(".choice")
    let question = questionTrim(document.querySelector(".question"))
    choice.forEach((elm, index) => {
        if (elm.id == "notsure") {
            delete choice[index]
        }
    })

    //guesses the question if its a image
    if (document.querySelector("img") && question == "Q: Choose the word that fits best.") {
        console.log("question checked as image type...")
        console.log("guessing...")
        let random = Math.floor(Math.random() * 4)
        let picked = answerTrim(choice[random])
        choice[random].click()
        return
    }

    if (!localStorage.getItem(question)) {
        //if it doesnt know the answer, guess
        console.log("didnt find an answer...")
        let random = Math.floor(Math.random() * (choice.length - 1))
        let picked = answerTrim(choice[random])
        choice[random].click()

        if (document.querySelector("h1.correct")) {
            //if guessed correctly somehow
            console.log("Guessed correctly!")
            console.log(`adding entry, question: ${question}, setting: ${picked}`)
            localStorage.setItem(question, picked)
        } else {
            //if incorrect then store what was correct
            console.log("bad guess...")
            let answer = document.querySelector("li.correct")
            let trimmed = answerTrim(answer)
            console.log(`adding entry, question: ${question}, setting: ${trimmed}`)
            localStorage.setItem(question, trimmed)
        }
    } else {
        //if it does know the answer
        console.log("found an answer!")
        let answer = localStorage.getItem(question)
        console.log(`question: ${question}, got: ${answer}`)
        choice.forEach(elm => {
            console.log("flipping " + elm)
            if (answerTrim(elm) == answer) {
                console.log("got match! element:" + elm)
                elm.click()
            }
        })
    }
}

setInterval(() => {
    if (document.getElementById("next-btn")) {
        wordLearn()
    } else if (lastWordLearn) {
        lastWord()
    }
    else {
        wordQuiz()
    }

}, 30000);
