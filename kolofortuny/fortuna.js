function openAuthorInfo() {
  document.getElementById("menu").style.display = 'none';
  document.getElementById("author").style.display = 'block';
}

function closeAuthorInfo() {
  document.getElementById("author").style.display = 'none';
  document.getElementById("menu").style.display = 'block';
}

function openGame() {
  document.getElementById("menu").style.display = 'none';
  document.getElementById("game").style.display = 'block';
  displayGuessedWord();
}

function displayGuessedWord() {
  var word = "Poland";
  for(const letter in word) {
    var letterDiv = document.createElement("div");
    letterDiv.className = "letter";
    letterDiv.id = `letter_${letter}`
    letterDiv.innerText = "_";

    document.getElementById("guessedWord").appendChild(letterDiv);
  }
}

function guessLetter() {
  var word = "Paland".toUpperCase();
  var letter = document.getElementById("inputLetter").value.toUpperCase();
  if(word.includes(letter)) {
    for(var i = 0; i < word.length; i++) {
      if(word[i] == letter) {
        document.getElementById(`letter_${i}`).innerHTML = letter;
      }
    }
  } else {
    var lifesDiv = document.getElementById("lifes");
    var lifes = lifesDiv.innerText.split(' ')[1] - 1;
    
    if(lifes === 0) gameOver();
    else lifesDiv.innerHTML = `Życia: ${lifes}`
  }
}

function gameOver() {
  document.getElementById("game").style.display = 'none';
  document.getElementById("menu").style.display = 'block';
  document.getElementById("gameOver").style.display = 'block';
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
