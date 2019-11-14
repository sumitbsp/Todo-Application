const todos = getSavedTodos()

let filters = {
   searchText: '',
   checkbox: false
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', function (e) {
   filters.searchText = e.target.value
   renderTodos(todos, filters)
})

document.querySelector('#checkbox').addEventListener('change', function(e) {
   filters.checkbox = e.target.checked
   renderTodos(todos, filters)
})


document.querySelector('#new-todo').addEventListener('submit', function (e) {
   e.preventDefault()
   todos.push({
      id: uuidv4(),
      text: e.target.elements.text.value,
      completed: false
   })
   saveData(todos)
   renderTodos(todos, filters)
   e.target.elements.text.value = ''
})