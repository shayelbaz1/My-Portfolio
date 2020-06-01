
//get item by key from local storage and parse it to value and return that value
function loadFromStorage(key) {
    var json = localStorage.getItem(key)
    var value = JSON.parse(json)
    return value;
}

//convert the value to JSON and create a new key and store the JSONvalue there
function saveToStorage(key, value) {
    var json = JSON.stringify(value);
    localStorage.setItem(key, json)
}