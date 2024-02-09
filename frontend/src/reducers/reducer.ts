import { ADD_TODO, REMOVE_TODO, RESET_STATE, SET_TODOS, UPDATE_TODO } from "../actions/action";


function reducer(state, action) {
    switch (action.type) {
        case SET_TODOS:
            return { todos: action.payload };
        case ADD_TODO:
            return { todos: [...state.todos, action.payload] };
        case REMOVE_TODO:
            return { todos: state.todos.filter(todo => todo._id !== action.payload) };
        case UPDATE_TODO:
            return { todos: state.todos.map(todo => {
                    if (todo._id === action.payload) {
                        if (todo.status === 'todo') todo.status = 'inprogress';
                        else if (todo.status === 'inprogress') todo.status = 'completed';
                    }
                    return todo;
                })
            };
        case RESET_STATE:
            return { todos: [] }
        default:
            return state;
    }
}

export default reducer;