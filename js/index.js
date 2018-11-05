'use strict';

let nextBtn = document.getElementById('next-btn');
let question = document.getElementById('question');
let answer = document.getElementById('answer');
let i;


nextBtn.addEventListener("click", newWord);
window.onload = function(){
    newWord();
}

function newWord() {
    i = Math.floor(Math.random() * words.length - 1);
    question.innerHTML = words[i].q;
    answer.innerHTML = words[i].a;
    fadeIn(question);
}


let dataset = [];

Promise.all([
        // "/../french-words/french-word-list-adjectives.csv",
        "/../french-words/french-word-list-nouns.csv",
        "/../french-words/french-word-list-verbs.csv",
    ].map(url => d3.csv(url))).then(function(values) {
    let data = values[0];

    data.forEach(entry=>{
        dataset.push(entry["language:"]);
    })

    // dataset.sort((a,b)=> a>b ? 1 : a<b ? -1 : 0);
    // console.log(dataset);
});



