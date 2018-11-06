'use strict';

let question = document.getElementById('question');
let answerInput = document.getElementById('answer');
let results = document.getElementById('results');
let inputForm = document.getElementById('inputForm');
let retryButton = document.getElementById('retryButton');
let countElement = document.getElementById('count');

const NUMBER_OF_TRIES = 10;
const KEY = 'trnsl.1.1.20181105T164937Z.ee522e94c8af9c25.2938b6eb1e9eecf9fcd356cb37a55bcb85964cbd';
let correctCount = 0;
let count = 0;
let incorrectWords = [];
let dataset = [];

inputForm.addEventListener('submit', submit);
retryButton.addEventListener('click', init);

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
        
        init();
    });
})();

function init() {
    count = 0;
    incorrectWords = [];
    // show results
    results.classList.remove('show');
    // hide input form
    inputForm.style.display = 'block';
    // show retry button
    retryButton.style.display = 'none';
    // make sure wrong answers are shown if user has answered all correct before    
    //TODO:
    // document.getElementById('results-container').style.visibility = 'visible';
    // set the number of tries
    countElement.textContent = NUMBER_OF_TRIES.toString();
    nextWord();
}

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
    countElement.textContent = NUMBER_OF_TRIES - count;

    if (count >= NUMBER_OF_TRIES) {
        // end game and show results
        let wrongAnswers = "";
        
        if (incorrectWords.length) {
            incorrectWords.forEach(function(wrong) {
                wrongAnswers += `<li><span class='red'>${wrong.question}</span> <i class="fa fa-arrow-right"></i> <span class='green'>${wrong.answer}</span></li>`;
            });
            document.getElementById('answersCorrect').textContent = (correctCount > 0 ? correctCount.toString() + ' correct!' : 'No correct answers :/ Try harder');            
            document.getElementById('answersWrong').innerHTML = `<span class='red'>${incorrectWords.length} wrong</span><ul>` + wrongAnswers + '</ul>';
        } else {
            document.getElementById('answersCorrect').innerHTML = 'Ohh la la! Sans erreur, bien fait!';
            // document.getElementById('results-container').style.visibility = 'hidden';
        }
        // show results
        results.classList.add('show');
        // hide input form
        inputForm.style.display = 'none';
        // show retry button
        retryButton.style.display = 'block';
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


