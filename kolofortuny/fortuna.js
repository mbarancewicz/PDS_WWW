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
    letterDiv.innerText = "_";

    document.getElementById("guessedWord").appendChild(letterDiv);
  }
}


var game = {
  zdobyte : 0,
  zycia : 1,
}
// alert(data[0]['country']);
var elem = document.getElementById("panstwa");
elem.innerHTML = data[0]['country'];

// alert(data.length);
// alert(data[0]['country'][2]);

 for (var i = 0; i < data[0]['country'].length; i += 1) {
    // alert(data[0]['country'][i]);  
  }


addElement("wrap");
//LISTENERS

document.getElementById("graj").addEventListener("click", Sprawdz_Litery); 
// alert(game.zycia);


//FUNKCJE
function Sprawdz_Litery(){
  var liter = document.getElementById("wpisz_litere").value;
  // alert(liter);
  // alert(getRandomInt(10,20));
}


function addElement(mydiv)
{
 
  newDiv = document.createElement("span");
  newDiv.innerHTML = "jasiokotek";

  my_div = document.getElementById(mydiv);
  document.body.insertBefore(newDiv, my_div);

  newDiv2 = document.createElement("span");
  newDiv2.innerHTML = "jasiokotek2";
  document.body.insertBefore(newDiv2, my_div.nextSibling);

  newDiv.classList.add("mystyle");  
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
