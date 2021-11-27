this.addEventListener('message', function(e) {
    if(validatePesel(e.data)) {
        this.postMessage(buildPesel(e.data));
    };
    this.close();
}, false);

function validatePesel(pesel) {
    var year = pesel[0];
    var month = pesel[1];
    var day = pesel[2];
    var postfix = pesel[3];

    if(year < 1930 || year > 2050) return false;
    if(month < 1 || month > 12) return false;
    if(day < 1 || day > 31) return false; // naive
    if(postfix.length !== 5) return false; // naive
    return true;
}

function buildPesel(peselArr) {
    var year = peselArr[0].substring(1,3);
    var month = buildMonth(peselArr[0], peselArr[1]);
    if(month.length == 1) month = '0' + month;
    var day = peselArr[2];
    if(day.length == 1) day = '0' + day;
    var postfix = peselArr[3];

    return year +
        month +
        day +
        postfix;
}

function buildMonth(year, month) {
    if(year >= 1900 && year <= 1999) return month;
    else if(year >= 1800 && year <= 1899) return parseInt(month) + 80;
    else if(year >= 2000 && year <= 2099) return parseInt(month) + 20;
    else if(year >= 2100 && year <= 2199) return parseInt(month) + 40;
    else if(year >= 2200 && year <= 2299) return parseInt(month) + 60;
    else return 0;
}