module.exports = function(module, value, string) {
    document.getElementById(module).setAttribute("status", value)
    document.getElementById(module).innerText = string;
}