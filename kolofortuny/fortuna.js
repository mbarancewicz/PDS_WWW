var game;

function getRandomCountry() {
  return data[getRandomInt(0, data.length - 1)].country.toUpperCase();
}

function initGameState() {
  var country = getRandomCountry();
  var lifes = 5;
  if(game != null) lifes = game.lifes + 5;

  game = {
    countryString : country,
    country: country.split(' '),
    lifes: lifes,
    blanks: country.split('').filter(l => l != ' ').length
  };
  console.log(game);
}

function initGame() {
  initGameState();
  console.log(game.country);
  displayGuessedWord();
  document.getElementById("lifes").innerHTML = `Życia: ${game.lifes}`;
}

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
  initGame();
}

function displayGuessedWord() {
  for(const word in game.country) {
    var guessedWord = document.createElement("div");
    guessedWord.className = "guessedWord";
    guessedWord.id = `guessedWord_${word}`;
  
    document.getElementById(`guessedCountry`).appendChild(guessedWord);

    for(const letter in game.country[word]) {
      var letterDiv = document.createElement("div");
      letterDiv.className = "letter";
      letterDiv.id = `letter_${word}_${letter}`;
      letterDiv.innerText = "_";
  
      document.getElementById(`guessedWord_${word}`).appendChild(letterDiv);
    }
  }
}

function guessLetter() {
  var letter = document.getElementById("inputLetter").value.toUpperCase();
  if(game.countryString.includes(letter) && letter != ' ') {
    for(var j = 0; j < game.country.length; j++) {
      console.log(game.country[j].length);
      for(var i = 0; i < game.country[j].length; i++) {
        if(game.country[j][i] == letter) {
          document.getElementById(`letter_${j}_${i}`).innerHTML = letter;
          game.blanks -= 1;
          if(game.blanks === 0) {
            clearLetters();
            initGame();
            return;
          }
        }
      }
    }
  } else {
    var lifesDiv = document.getElementById("lifes");
    game.lifes -= 1;
    if(game.lifes === 0) gameOver();
    else lifesDiv.innerHTML = `Życia: ${game.lifes}`
  }
}

function clearLetters() {
  document.querySelectorAll('.letter').forEach(e => e.remove());
}

function gameOver() {
  clearLetters();
  document.getElementById("game").style.display = 'none';
  document.getElementById("menu").style.display = 'block';
  document.getElementById("gameOver").style.display = 'block';
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}