this.addEventListener('message', function(e) {
    var message = "Nieprawidlowy PESEL!"; 
    if(validateInput(e.data)) {
        var pesel = buildPesel(e.data);

        if(validateControlNumber(pesel.split(""))) {
            message = "Poprawny PESEL: " + pesel;
        }
    }
    this.postMessage(message);    
    this.close();
}, false);

function validateInput(pesel) {
    var year = pesel[0];
    var month = pesel[1];
    var day = pesel[2];
    var postfix = pesel[3];

    var date = new Date(year, month - 1, day - 1)
    if(date.isNan || postfix.length !== 5) return false;
    return true;
}

function validateControlNumber(pesel) {
    var weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

    var zipped = pesel
        .slice(0, pesel.length - 1)
        .map((x, i) => [x, weights[i]]);

    var sumOfWeights = zipped.map(pair =>
            pair.reduce((a,b) => a * b))
        .reduce((a,b) => a + b);

    var controlNumber = (10 - sumOfWeights % 10) % 10;
    if(controlNumber != pesel[pesel.length - 1]) return false;
    return true;
}

function buildPesel(peselArr) {
    var year = peselArr[0].substring(2,4);
    var month = buildMonth(peselArr[0], peselArr[1]);
    var day = peselArr[2];
    var postfix = peselArr[3];

    if(month.length == 1) month = '0' + month;
    if(day.length == 1) day = '0' + day;
    
    return year + month + day + postfix;
}

function buildMonth(year, month) {
    if(year >= 1900 && year <= 1999) return month;
    else if(year >= 1800 && year <= 1899) return parseInt(month) + 80;
    else if(year >= 2000 && year <= 2099) return parseInt(month) + 20;
    else if(year >= 2100 && year <= 2199) return parseInt(month) + 40;
    else if(year >= 2200 && year <= 2299) return parseInt(month) + 60;
    else return 0;
}