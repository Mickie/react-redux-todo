import React from 'react';
import { Spin, Alert } from 'antd';
export function RequestLoading() {
    return (<div className="loading"><Spin tip="Loading..." /></div>)
}