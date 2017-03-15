import React from 'react';
import { Button } from 'antd';
export default class MyButton extends React.Component {
    render() {
        const {buttonName, onButtonClick, type, size} = this.props;
        return (
            <Button type={type} size={size} onClick={onButtonClick}>{buttonName}</Button>
        )
    }
}

MyButton.defaultProps = {
    type: null,
    size: null
};
