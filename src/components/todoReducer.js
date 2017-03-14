import { combineReducers } from 'redux';
import { ADD_TO_DO, TOGGLE_TO_DO, DEL_TO_DO, SELECT_TO_DO, FETCH_TO_DO } from './todoAction';


const initStore = {
    text: 'shopping',
    completed: false
};

const todoReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_DO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
            break;
        case TOGGLE_TO_DO:
            return state.map((s, index) => {
                if (action.idx == index) {
                    return {
                        ...s,
                        completed: !s.completed
                    }
                } else {
                    return s;
                }
            });
            break;
        case DEL_TO_DO:
            return state.filter((s, index) => action.idx != index);
            break;

        case FETCH_TO_DO:
            return [
                ...state,
                ...action.todos
            ];
            break;
        default:
            return state;
            break;
    }
};

const todoFilter = (state = "show_all", action) => {
    switch (action.type) {
        case SELECT_TO_DO:
            return action.stats;
            break;
        default:
            return state;
            break;
    }
};


const rootReducer = combineReducers({
    todos: todoReducer,
    filter: todoFilter
});

export default rootReducer;




