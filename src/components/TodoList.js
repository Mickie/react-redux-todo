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
                        <span>{i+1}.&nbsp;&nbsp;</span><span style={textColor(todo.completed)}>{todo.text}</span>
                        <MyButton type="dashed" size="small" onButtonClick={() => this.props.toggleTodo(i)}
                                  buttonName="toggle"/>
                        <MyButton type="danger" size="small" onButtonClick={() => this.props.delTodo(i)}
                                  buttonName="del"/>
                    </li>
                )}
            </ul>
        );
    }
};
