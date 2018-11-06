'use strict';

let question = document.getElementById('question');
let answerInput = document.getElementById('answer');
let results = document.getElementById('results');
const KEY = 'trnsl.1.1.20181105T164937Z.ee522e94c8af9c25.2938b6eb1e9eecf9fcd356cb37a55bcb85964cbd';
let i;
let correctCount = 0;
let count = 0;
let incorrectWords = [];
let dataset = [];

document.getElementById('inputForm').addEventListener('submit', submit);

(function() {
    // load words from csv files
    Promise.all([
        // "/../french-words/french-word-list-adjectives.csv",
        "/../french-words/french-word-list-nouns.csv",
        "/../french-words/french-word-list-verbs.csv",
    ].map(url => d3.csv(url))).then(function(values) {
        let data = values[0];
        // filter
        data.forEach(entry=>{
            dataset.push(entry["language:"]);
        });
        // render the next word
        nextWord();
    });
})();


async function submit(e) {
    if (e) e.preventDefault();
    const word = question.innerHTML.toLowerCase();    // question
    const translation = await getTranslation(word);   // answer
    let correct = isCorrect(translation);   // check if the answer is correct

    if (correct) {
        // increment number of correct answers
        correctCount++;
        showToast(true);
    } else {
        // save word that was incorrect
        incorrectWords.push({
            question: word,
            answer: translation
        });
        showToast(false);
    }
    count++;
    if (count > 5) {
        // end game and show results
        document.getElementById('answersCorrect').textContent = (correctCount > 0 ? correctCount.toString() + ' correct!' : 'No correct answers :/ Try harder');
        let wrongAnswers = "";
        incorrectWords.forEach(function(wrong) {
            wrongAnswers += `<li><span class='red'>${wrong.question}</span> <i class="fa fa-arrow-right"></i> <span class='green'>${wrong.answer}</span></li>`;
        });
        document.getElementById('answersWrong').innerHTML = `<span class='red'>${incorrectWords.length} wrong</span><ul>` + wrongAnswers + '</ul>';
        results.classList.add('show');
    } else {
        nextWord();
    }
}

function getTranslation(word) {
    const URL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${KEY}&text=${word}&lang=fr-en`;
    return fetch(URL).then(function(response) {
        return response.json().then(function(data) {
            if (data.code == 200) {
                return data.text[0].toLowerCase();
            }
        });
    });
}

function isCorrect(translated) {
    const answer = answerInput.value.trim().toLowerCase();    // get user input answer
    let _translated = translated.split(' ');
    let flag = false;
    _translated.forEach(function(word) {
        if (translated === answer || word === answer) {
            flag = true;
        }
    })
    return flag;
}

function nextWord() {
    // clear user input 
    answerInput.value = "";
    question.innerHTML = dataset[Math.floor(Math.random() * dataset.length - 1)];
    fadeIn(question);
}

function showToast(correct) {
    let toast;
    if (correct) {
        toast = document.getElementById('correct');
    } else {
        toast = document.getElementById('wrong');
    }
    
    // animate toast
    toast.classList.add('active');
    setTimeout(function() {
        toast.classList.remove('active');
    }, 1500);    
}


