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
    ADD_TO_DO(){
        return {
            type: 'add_to_do',
            text: 'more shopping'
        }
    },
    TOGGLE_TO_DO(idx){
        return {
            type: 'toggle_to_do',
            idx: idx
        }
    },
    DEL_TO_DO(idx){
        console.log("del dispatched");
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
                        completed: !s.complete
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
class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.todos.map((todo, i) =>
                    <li key={i}>
                        {todo.text}
                        <MyButton onButtonClick={() => this.props.delTodo(i)}
                                  buttonName="del"/>
                    </li>
                )}
            </ul>
        );
    }
}

class MyButton extends React.Component {
    render() {
        const {buttonName, onButtonClick} = this.props;
        return (
            <button onClick={onButtonClick}>{buttonName}</button>
        )
    }
}

class HandleTodo extends React.Component {
    render() {
        const {todos, addTodo, delTodo}=this.props;
        return (
            <div>
                <input placeholder="todo name..."/>
                <TodoList todos={todos} delTodo={delTodo}/>
                <button onClick={addTodo}>addToDo</button>
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
        addTodo: () => dispatch(ACTIONS.ADD_TO_DO()),
        delTodo: bindActionCreators(ACTIONS.DEL_TO_DO, dispatch)
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