/*TODO
1. fix bugs
2. add image support
    - each image has a unique url, so you could key the url and value the answer in local storage
*/

const key = "YOUR HUGGING FACE KEY"

const correct = ".correct"
const incorrect = ".incorrect"
let lastWordLearn = ""

//easily get the answer by using choice.foreach

function answerTrim(elm) {
    return elm.textContent.trim()
}


function questionTrim(elm) {
    return elm.textContent.replace(/[\r\n]+/g," ").trim()
}

//sends a request to hugging face
async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
        {
            headers: { Authorization: `Bearer ${key}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

//i took this from stackoverflow
//in stackoverflow we trust
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
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

    document.getElementById("choice").value = lastWordLearn
    lastWordLearn = ""
    var ev = document.createEvent('Event');
    ev.initEvent('keypress');
    document.getElementById("choice").dispatchEvent(ev)
}

//answers the multiple choice question (without the images)
async function wordQuiz() {
    console.log("Word quiz start")

    //if there is no question then skip
    if (!document.querySelector(".choice")) {
        console.log("couldn't find .choice, ending....")
        return
    }

    let choice = document.querySelectorAll(".choice")
    let question = questionTrim(document.querySelector(".question"))

    //guesses the question if its a image
    if (document.querySelector("img") && question == "Q: Choose the word that fits best.") {
        console.log("question checked as image type...")
        console.log("guessing...")
        let random = Math.floor(Math.random() * (choice.length - 1))
        let picked = answerTrim(choice[random])
        choice[random].click()
        return
    }

    if (localStorage.getItem(question) == null) {
        //if it doesnt know the answer, guess
        console.log("didnt find an answer...")


        //setups the answers for the ai to respond
        let querySentence = []
        choice.forEach(elm => {
            if (elm.id == "notsure") return
            querySentence.push(answerTrim(elm))
        })

        console.log("sending prompt")
        console.log(question.replace("Q: ", ""))
        console.log(querySentence)
        let indexAnswer = 0
        await query({"inputs": {
                "source_sentence": question.replace("Q: ", ""),
                "sentences": querySentence
            }}).then((response) => {
            console.log("response got")
            console.log(JSON.stringify(response));
            indexAnswer = indexOfMax(response)
            console.log(indexAnswer)
        });
        
        let picked = answerTrim(choice[indexAnswer])
        console.log(`bot guesses: ${picked}`)
        choice[indexAnswer].click()
        await new Promise(resolve => setTimeout(resolve, 2500))

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
    } else if (document.getElementById("wordspell")) {
        lastWord()
    }
    else {
        wordQuiz()
    }

}, 23000);
