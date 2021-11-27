this.addEventListener('message', function(e) {
    var message = "Nieprawidlowa data!"; 
    if(validateInput(e.data)) {
        var allPossibleCombinations = buildAllPossibleValidCombinations(e.data);
        message = allPossibleCombinations;
    }
    this.postMessage(message);    
    this.close();
}, false);

function validateInput(pesel) {
    var year = pesel[0];
    var month = pesel[1];
    var day = pesel[2];

    if(year < "1800" || year > "2299" || month < "0" || month > "12" || day < "1" || day > "31") return false;

    var date = new Date(year, month - 1, day - 1)
    if(date.isNan) return false;
    return true;
}

function buildControlNumber(pesel) {
    var weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    console.log(pesel);
    var zipped = pesel
        .split("")
        .map((x, i) => [x, weights[i]]);

    var sumOfWeights = zipped.map(pair =>
            pair.reduce((a,b) => a * b))
        .reduce((a,b) => a + b);

    return (10 - sumOfWeights % 10) % 10;
}

function buildAllPossibleValidCombinations(peselArr) {
    var year = peselArr[0].substring(2,4);
    var month = buildMonth(peselArr[0], peselArr[1]);
    var day = peselArr[2];

    if(month.length == 1) month = '0' + month;
    if(day.length == 1) day = '0' + day;
    
    var validCombinations = [];

    for(i = 0; i <= 9999; i++) {
        var postfix = ("000" + i).slice(-4);
        validCombinations.push(year + month + day + postfix + buildControlNumber(year + month + day + postfix));
    }
    
    return validCombinations;
}

function buildMonth(year, month) {
    if(year >= 1900 && year <= 1999) return month;
    else if(year >= 1800 && year <= 1899) return parseInt(month) + 80;
    else if(year >= 2000 && year <= 2099) return parseInt(month) + 20;
    else if(year >= 2100 && year <= 2199) return parseInt(month) + 40;
    else if(year >= 2200 && year <= 2299) return parseInt(month) + 60;
    else return 0;
}