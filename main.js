//TIMEOUT
/*var xhr = new XMLHttpRequest();
var data;

xhr.open ("GET", "https://swapi.co/api/");
xhr.send();


xhr.onreadystatechange= function () {
    if (this.readyState == 4 && this.status ==200) {
      data = JSON.parse(this.responseText);
    }
};

setTimeout(function () {
    console.log(data);
}, 500);*/
//CALLBACK To Write to Console
/*function getData(cb) {
    var xhr = new XMLHttpRequest();


    xhr.open("GET", "https://swapi.co/api/");
    xhr.send();


    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb (JSON.parse(this.responseText));
        }
    };
}

function printDataToConsole(data) {
    console.log(data);
}
getData(printDataToConsole);*/
//To Write to Document Part One

/*const baseURL = "https://swapi.co/api/";
function getData(type, cb) {
    var xhr = new XMLHttpRequest();


    xhr.open("GET", baseURL + type + "/");
    xhr.send();


    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb (JSON.parse(this.responseText));
        }
    };
}
function writeToDocument(type) {
    getData(type, function (data) {
        document.getElementById("data").innerHTML = data;
    });
}*/
// Unpacking Our Data Onto The DOM

function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");

    getData(url, function(data) {
        var pagination = "";

        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
}