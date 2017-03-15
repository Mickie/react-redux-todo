import React from 'react';
import { connect, Provider } from 'react-redux';
import MyButton  from './MyButton';
import TodoList  from './TodoList';
import  todoStore  from './todoStore';
import {
    sendAddTodoRequest,
    sendToggleTodoRequest,
    sendDelTodoRequest,
    selectTodo,
    sendGetTodoRequest
} from './todoAction';
import { Input } from 'antd';

class HandleTodo extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({value: e.target.value})
    }

    componentDidMount() {
        this.props.getTodo();
    }

    render() {
        const aStyle = {
            color: 'blue',
            textDecoration: 'underline'
        };
        return (
            <div className="container">
                <Input placeholder="todo name..." onChange={this.handleInputChange}/>
                <TodoList {...this.props} />
                <MyButton size="large" type="primary" onButtonClick={() => this.props.addTodo(this.state.value)}
                          buttonName="add"/>
                <a style={aStyle} onClick={() => this.props.selectTodo("show_all")}>select all</a> &nbsp;&nbsp;
                <a style={aStyle} onClick={() => this.props.selectTodo("show_completed")}>select completed</a>
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
        addTodo: (txt) => {
            dispatch(sendAddTodoRequest(txt))
        },
        delTodo: (idx) => {
            dispatch(sendDelTodoRequest(idx))
        },
        toggleTodo: (idx) => {
            dispatch(sendToggleTodoRequest(idx))
        },
        selectTodo: (stats) => {
            dispatch(selectTodo(stats))
        },
        getTodo: () => {
            dispatch(sendGetTodoRequest())
        }
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
