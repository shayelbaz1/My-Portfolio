
//get Todos from storage
var gTodos = _createTodos();
var gTodosFilter = 'all'
var gTodosSort = 'created'

//return a todos by filter and todo.isDone
function getTodosForDisaply() {
    sortTodos()
    if (gTodosFilter === 'all') return gTodos;//return all if filter is all
    var todos = gTodos.filter(function (todo) {
        return (gTodosFilter === 'done' && todo.isDone) ||
            (gTodosFilter === 'active' && !todo.isDone)
    })
    return todos;
}

function sortTodos() {
    switch (gTodosSort) {
        case 'created':
            gTodos.sort(byDateDec);
            break;
        case 'text':
            gTodos.sort(byTitle);
            break;
        case 'import':
            gTodos.sort(byImportDec);
            break;
        default:
            break;
    }
}

function byDateDec(a, b) {
    if (a.time < b.time) {
        return 1;
    }
    if (a.time > b.time) {
        return -1;
    }
    return 0;
}
function byTitle(a, b) {
    if (a.txt < b.txt) {
        return -1;
    }
    if (a.txt > b.txt) {
        return 1;
    }
    return 0;
}
function byImportDec(a, b) {
    if (a.importance < b.importance) {
        return 1;
    }
    if (a.importance > b.importance) {
        return -1;
    }
    return 0;
}

function setFilter(filterBy) {
    gTodosFilter = filterBy;
}
function setSort(sortBy) {
    gTodosSort = sortBy;
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    saveToStorage('todos', gTodos)
}

function removeTodo(todoId) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1)
    saveToStorage('todos', gTodos)
}

//create and add todo object to the model with gTodos.unshift(todo)
function addTodo(txt, imp) {
    var todo = _createTodo(txt, imp);
    gTodos.unshift(todo)
    saveToStorage('todos', gTodos)
}

//get Todos Count by length
function getTodosCount() {
    return gTodos.length;
}

//get Active todo by filter every todo that is not done to a new array
function getActiveTodosCount() {
    var activeTodos = gTodos.filter(function (todo) { return !todo.isDone })
    return activeTodos.length
}

// get todos from storage if not exist create new
function _createTodos() {
    var todos = loadFromStorage('todos')
    if (!todos || !todos.length) {
        var txts = ['Master CSS', 'Learn HTML', 'Become JS Ninja'];
        var todos = txts.map(txt => _createTodo(txt))
        saveToStorage('todos', todos)
    }
    return todos;
}

//return object todo by txt
function _createTodo(txt, imp = 1) {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        importance: imp,
        time: Date.now()
    }
}

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}