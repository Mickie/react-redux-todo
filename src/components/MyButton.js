import React from 'react';
export default class MyButton extends React.Component {
    render() {
        const {buttonName, onButtonClick} = this.props;
        return (
            <button onClick={onButtonClick}>{buttonName}</button>
        )
    }
}
