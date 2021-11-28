this.addEventListener('message', function(e) {
    var allPossibleCombinations = buildDateFromControlNumber(e.data);
    this.postMessage(allPossibleCombinations);
    this.close();
}, false);

function buildDateFromControlNumber(postfix) {
    var weights = [1,   3,  7,  9,  1,  3,  7,  9,  1,  3];
    var pesel =   [-1, -1, -1, -1, -1, -1];
    pesel.concat(postfix.split(""));
    var controlNumber = postfix.slice(-1);

    var validCombinations = [];
    for(year = 1930; year <= 2050; year ++) {
        for(month = 1; month <= 12; month++) {
            for(day = 1; day <= countDaysInMonth(month - 1, year - 1); day++) {
                var p = buildPesel(year, month, day, postfix);
                if(isValid(p, controlNumber)) validCombinations.push(p);
            }
        }
    }
    return validCombinations;
}

function buildPesel(year, month, day, postfix) {
    var y = year.toString().substring(2,4);
    var m = ('0' + buildMonth(year, month)).slice(-2);
    var d = ('0' + day.toString()).slice(-2);
    
    return y + m + d + postfix;
}


function isValid(pesel, control) {
    var weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    
    var zipped = pesel.substring(0, pesel.length - 1)
        .split("")
        .map((x, i) => [x, weights[i]]);

    var sumOfWeights = zipped.map(pair =>
            pair.reduce((a,b) => a * b))
        .reduce((a,b) => a + b);

    return ((10 - sumOfWeights % 10) % 10) == control;
}

function buildMonth(year, month) {
    if(year >= 1900 && year <= 1999) return month;
    else if(year >= 1800 && year <= 1899) return parseInt(month) + 80;
    else if(year >= 2000 && year <= 2099) return parseInt(month) + 20;
    else if(year >= 2100 && year <= 2199) return parseInt(month) + 40;
    else if(year >= 2200 && year <= 2299) return parseInt(month) + 60;
    else return 0;
}

function countDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days.length;
  }