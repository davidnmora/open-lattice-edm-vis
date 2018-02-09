const todo = (todoState = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (todoState.id !== action.id) {
        return todoState
      }

      return Object.assign({}, todoState, {
        completed: !todoState.completed
      })

    default:
      return todoState
  }
}

const todos = (todoState = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...todoState, todo(undefined, action)]
    case 'TOGGLE_TODO':
      return todoState.map(t => todo(t, action))
    default:
      return todoState
  }
}

export default todos
