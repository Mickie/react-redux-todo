import React from 'react';
import { createStore, bindActionCreators } from 'redux';
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
    }
};

//reducer

const todoReducers = (state = [initStore], action) => {
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

//store
let todoStore = createStore(todoReducers);

//for test purpose
todoStore.subscribe(() => {
    console.log(todoStore.getState());
});

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
        const {todos, addTodo, delTodo, toggleTodo}=this.props;
        return (
            <div>
                <input placeholder="todo name..." ref={(input) => {
                    this.textinput = input;
                }}/>
                <TodoList {...this.props} />
                <MyButton onButtonClick={() => addTodo(this.textinput.value)}
                          buttonName="add"/>
            </div>
        )
    }
}

/* connect redux store to react components

 */
const mapStoreToProps = (store) => {
    return {
        todos: store
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: bindActionCreators(ACTIONS.ADD_TO_DO, dispatch),
        delTodo: bindActionCreators(ACTIONS.DEL_TO_DO, dispatch),
        toggleTodo: bindActionCreators(ACTIONS.TOGGLE_TO_DO, dispatch)
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