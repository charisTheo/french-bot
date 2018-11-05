var recognition = new webkitSpeechRecognition();
var hintText = document.getElementById('hintText');
var textCommand = document.getElementById('textCommand');
recognition.continuous = true

askPermission().catch(function(e){
    window.console.warn = e;
    alert("Sorry for that but your browser is not supported :/ Get a decent one(chrome)");
});

async function askPermission(){
    if (!navigator.getUserMedia) {
        try {
            await navigator.webkitGetUserMedia({audio: true}, onSuccess, onError);
        } catch (e) {
            throw e;
        }
    } else {
        try {
            await navigator.getUserMedia({audio: true}, onSuccess, onError);
        } catch (e) {
            throw e;
        }
    }    
}

function onSuccess() {
    recognition.start();
    document.getElementById('listening').style.display = "block";
    hintText.style.display = "block";   
}

function onError(e) {
    alert(e);
    // window.console.error = e.toString();
    document.getElementById('errorText').textContent = "There was an error accessing the microphone :/";
}

recognition.onresult = function(event) {
    document.getElementsByClassName('container')[0].style.color = "#1C75BC";
    //remove hint and display command spoken
    hintText.style.display = "none";
    textCommand
        .style.display = "block"
        .textContent += event.results;

    var words = [];
    for (var i = 0; i < event.results.length; i++) {
        if (event.results[i] != "find") {
            words.push();
        }
    }
    
    window.find(words.toString());
}
