// main application
var x = 2;
var version = "3.4";

function hello(name) {
    return "Hello, " + name + "!";
}

function init() {
    console.log("App " + version + " started");
    var msg = hello("World");
    console.log(msg);
}
