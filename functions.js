// get saved data from local storage if present, else return empty array
const getSavedTodos = function() {
    let todosJSON = localStorage.getItem('todos')
    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
     } else {
         return []
     }
}

// save todos to local storage
const saveData = function(todo) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// render application todos

const renderTodos = function (todos, filters) {
    let filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })
 
    
    filteredTodos = filteredTodos.filter(function (todo){
       return !filters.checkbox || !todo.completed
    })
 
    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })
 
    document.querySelector('#todos').innerHTML = ''
 

    document.querySelector('#todos').appendChild(generateSummaryDom(incompleteTodos))
 
    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDom(todo))
    })
 }

// remove todos on delete click
const removeTodos = function(id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}


// making value of checkbox true if the value of complated todo is true
const checkboxDefault = function(todo) {
    if (todo.completed) {
        checkBox.checked = true
        saveData(todos)
        renderTodos(todos, filters)
    } 
}

// toggle todo completed value on click

const toggleTodo = function (id) {
    const todo = todos.find( function (todo) {
        return todo.id === id
    })
    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
}

 // generate Todo Element
 const generateTodoDom = function(todo) {
    const todoDiv = document.createElement('div')  // creating container for the todo
    const todoText = document.createElement('span') //creating the text element for todo
    const checkBox = document.createElement('input') //checkbox
    const todoButton = document.createElement('button') // button to delete the todo
    todoButton.textContent = 'Delete'
    checkBox.setAttribute('type', 'checkbox')
    todoDiv.appendChild(checkBox)
    todoDiv.appendChild(todoText)
    todoDiv.appendChild(todoButton)

    checkBox.checked = todo.completed

    todoButton.addEventListener('click', function() {
        removeTodos(todo.id)
        saveData(todos)
        renderTodos(todos, filters)
    })

    checkBox.addEventListener('click', function(){
        toggleTodo(todo.id)
        saveData(todos)
        renderTodos(todos, filters)
    })

    todoText.textContent = todo.text
    return todoDiv 
 }

 // generate summary DOM
const generateSummaryDom = function(incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}