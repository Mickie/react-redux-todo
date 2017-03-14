import React from 'react';
import MyButton  from './MyButton';
export default class TodoList extends React.Component {
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
};
