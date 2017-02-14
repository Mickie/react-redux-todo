import React from 'react';
import { createStore, bindActionCreators, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
/*
 store tree

 [{
 text: 'todo',
 completed: false
 },{}]

 */

const initStore = {
    text: 'shopping',
    completed: false
};

//action Creator

const ACTIONS = {
    ADD_TO_DO(txt){
        return {
            type: 'add_to_do',
            text: txt
        }
    },
    TOGGLE_TO_DO(idx){
        return {
            type: 'toggle_to_do',
            idx: idx
        }
    },
    DEL_TO_DO(idx){
        return {
            type: 'del_to_do',
            idx: idx
        }
    },
    SELECT_TO_DO(stats){
        return {
            type: 'select_to_do',
            stats
        }
    }
};

//reducer

const todoReducer = (state = [initStore], action) => {
    switch (action.type) {
        case "add_to_do":
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
            break;
        case "toggle_to_do":
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
        case "del_to_do":
            return state.filter((s, index) => action.idx != index);
            break;
        default:
            return state;
            break;
    }
};

const todoFilter = (state = "show_all", action) => {
    switch (action.type) {
        case "select_to_do":
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

//store

let todoStore = createStore(rootReducer);


//ui components

class MyButton extends React.Component {
    render() {
        const {buttonName, onButtonClick} = this.props;
        return (
            <button onClick={onButtonClick}>{buttonName}</button>
        )
    }
}

class TodoList extends React.Component {
    render() {
        const textColor = (completed) => {
            return completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}
        };
        return (
            <ul>
                {this.props.todos.map((todo, i) =>
                    <li key={i}>
                        <span style={textColor(todo.completed)}>{todo.text}</span>
                        <MyButton onButtonClick={() => this.props.delTodo(i)}
                                  buttonName="del"/>
                        <MyButton onButtonClick={() => this.props.toggleTodo(i)}
                                  buttonName="toggle"/>
                    </li>
                )}
            </ul>
        );
    }
}

class HandleTodo extends React.Component {
    render() {
        const {todos, addTodo, delTodo, toggleTodo, selectTodo}=this.props;
        const aStyle = {
            color: 'blue',
            textDecoration: 'underline'
        };
        return (
            <div>
                <input placeholder="todo name..." ref={(input) => {
                    this.textinput = input;
                }}/>
                <TodoList {...this.props} />
                <MyButton onButtonClick={() => addTodo(this.textinput.value)}
                          buttonName="add"/>
                <a style={aStyle} onClick={() => selectTodo("show_all")}>select all</a> &nbsp;&nbsp;
                <a style={aStyle} onClick={() => selectTodo("show_completed")}>select completed</a>
            </div>
        )
    }
}

/* connect redux store to react components

 */

const visibleTodos = (todos, filter) => {
    switch (filter) {
        case "show_completed":
            return todos.filter((t) => t.completed);
            break;
        case "show_incompleted":
            return todos.filter((t) => !t.completed);
            break;
        default:
            return todos;
            break;
    }
};

const mapStoreToProps = (store) => {
    return {
        todos: visibleTodos(store.todos, store.filter)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: bindActionCreators(ACTIONS.ADD_TO_DO, dispatch),
        delTodo: bindActionCreators(ACTIONS.DEL_TO_DO, dispatch),
        toggleTodo: bindActionCreators(ACTIONS.TOGGLE_TO_DO, dispatch),
        selectTodo: bindActionCreators(ACTIONS.SELECT_TO_DO, dispatch)
    }
};

const TodoApp = connect(mapStoreToProps, mapDispatchToProps)(HandleTodo);

const App = () => {
    return (
        <Provider store={todoStore}>
            <TodoApp />
        </Provider>
    )
};

export default App;