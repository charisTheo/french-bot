'use strict';

let nextBtn = document.getElementById('next-btn');
let question = document.getElementById('question');
let i;


nextBtn.addEventListener("click", newWord);
window.onload = function(){
    newWord();
}

function newWord() {
    i = Math.floor(Math.random() * words.length - 1);
    question.innerHTML = words[i].q;
    fadeIn(question);
}