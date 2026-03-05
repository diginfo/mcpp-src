// simple ajax wrapper
function ajax(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            callback(xhr.status, JSON.parse(xhr.responseText));
        }
    };
    xhr.send(data ? JSON.stringify(data) : null);
}

function get(url, callback) {
    return ajax("GET", url, null, callback);
}

function post(url, data, callback) {
    return ajax("POST", url, data, callback);
}
