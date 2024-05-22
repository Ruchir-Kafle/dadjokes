let buttonPrompts = [
    "New joke",
    "Another joke",
    "Gimme another",
    "I need more",
    "More please",
    "Another",
    "Keep this train a rollin'",
    "I can't stop",
    "won't stop",
    "never gonna stop",
    "never gonna give you up",
    "never gonna let you down",
    "never gonna run around",
    "and desert you",
];

const jokeBtn = document.querySelector("#joke-btn");
jokeBtn.addEventListener("click", () => {
    getJoke();
    console.log(jokes.length)
});

const copyBtn = document.querySelector("#copy-btn");
copyBtn.addEventListener('click', shareOrCopy);

let jokes = [];
let joker;
let counter = 0;
let j = 0;

function updateButton(joke) {
    counter++;

    if (counter >= buttonPrompts.length) {
        counter = 1;
    }

    jokeBtn.innerHTML = `${buttonPrompts[counter]} &hellip;`;
    document.querySelector("p").innerHTML = joke;
}

async function getJoke() {
    if (jokes.length >= 50) {
        let joke = jokes[j];
        j++;

        if (j>=jokes.length) {
            j = 0;
        }

        updateButton(joke)
    } else {
        fetchJoke();
    }
}

async function fetchJoke() {
    const response = fetch("https://icanhazdadjoke.com/", {
        headers: {
        Accept: "text/plain",
        },
    })
    .then((response) => response.text())
    .then((data) => {
        const joke = data;
        jokes.push(joke);
        setJoker();
        // So, um, you have to enable "shareware" within about:config inside FireFox.

        updateButton(joke)
        
        return joke;
    });
}


async function resetter() {
    setTimeout(() => {
        copyBtn.textContent = "Share joke!";
    }, 2000);
}
console.log(navigator);


function shareOrCopy() {
if (navigator.canShare) {
    if (navigator.canShare(joker)) {
        shareJoke()
    } else {
        copyJoke();
    }
} else {
    copyJoke();
}

}

function shareJoke() {
    navigator.share(joker);
    copyBtn.textContent = "Joke copied!";
    resetter();
}

function copyJoke() {
    try {
        navigator.clipboard.writeText(joker.text);
        copyBtn.textContent = "Joke copied!";
        resetter();
    } catch (error) {
        copyBtn.textContent = "Copy failed";
        resetter();
    }
}

function setJoker() {
    joker = {
        text: `${jokes[jokes.length-1]} 
        - 🤡 Want more jokes? Get them at https://jeffhow.github.io/dadjokes/ `,
    };
}
getJoke();