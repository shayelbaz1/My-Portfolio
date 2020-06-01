console.log('Hi');
//Add the following properties to the todo:
function onInit() {
    renderTodos();
}

function renderTodos() {
    //get the todos array by filtering active/done/all 
    var strHTMLs = '';
    var todos = getTodosForDisaply();
    if (!todos.length) {
        console.log('No dotos');
        strHTMLs = [`<li >No todos</li>`]
    } else {
        //create an array
        strHTMLs = todos.map(function (todo) {
            var className = (todo.isDone) ? 'done' : '';
            return `<li onclick="onTodoClicked('${todo.id}')" class="${className}">
        ${todo.txt}-${todo.importance}
        <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
        </li>`
        })
    }
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('');
    document.querySelector('.total-count').innerText = getTodosCount();
    document.querySelector('.active-count').innerText = getActiveTodosCount();

}

function onTodoClicked(todoId) {
    //update the model by finding a todo and set to done
    toggleTodo(todoId);
    renderTodos();
}

//remove from model with splice findIdx(todo=>todo.id=todo.Id)
function onRemoveTodo(todoId, ev) {
    ev.stopPropagation();//stop the bubbeling by ev.stopPropagation()
    var agree = confirm('Delete?')
    if (!agree) return;
    removeTodo(todoId)
    renderTodos();
}

//add a todo to the model
function onAddTodo() {
    var elTitle = document.querySelector('input.input-title')
    var elImport = document.querySelector('input.input-import')
    var txt = elTitle.value;//set txt by elTxt.value
    var imp = elImport.value;
    if (imp > 3 || imp < 1) return;
    if (!txt) return;
    addTodo(txt, imp)//add todo to model by txt and make id
    elTitle.value = '';//delete the value
    elImport.value = '';//delete the value
    renderTodos();
}

//fire the onchange of HTML and get the value from the option
function onSetFilter(filterBy) {
    //set the filter in the model to the curr value
    setFilter(filterBy);
    renderTodos();
}

//fire the onchange of HTML and get the value from the option
function onSetSort(sortBy) {
    //set the sort in the model to the curr value
    setSort(sortBy);
    renderTodos();
}