import { requestAddTodo, requestToggleTodo, requestDelTodo, requestGetTodo } from './httpApi';

export const ADD_TO_DO = 'add_to_do';
export const TOGGLE_TO_DO = 'toggle_to_do';
export const DEL_TO_DO = 'del_to_do';
export const SELECT_TO_DO = 'select_to_do';

function addTodo(text) {
    return {
        type: ADD_TO_DO,
        text
    }
}

function toggleTodo(idx) {
    return {
        type: TOGGLE_TO_DO,
        idx
    }
}

function delTodo(idx) {
    return {
        type: DEL_TO_DO,
        idx
    }
}

export function selectTodo(stats) {
    return {
        type: SELECT_TO_DO,
        stats
    }
}

export function sendAddTodoRequest(txt) {
    return dispatch => {
        return requestAddTodo(txt).then(
            () => {
                dispatch(addTodo(txt));
            }
        )
    }
}

export function sendToggleTodoRequest(idx) {
    return dispatch => {
        return requestToggleTodo(idx).then(
            () => {
                dispatch(toggleTodo(idx));
            }
        )
    }
}

export function sendDelTodoRequest(idx) {
    return dispatch => {
        return requestDelTodo(idx).then(
            () => {
                dispatch(delTodo(idx));
            }
        )
    }
}






