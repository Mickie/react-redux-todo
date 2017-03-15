//import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { RequestLoading } from './RequestLoading';

export function requestAddTodo(txt){
    loading();
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(txt);
            hideLoading();
        }, 2000)
    })
}

export function requestToggleTodo(idx){
    loading();
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
            hideLoading();
        }, 500)
    })
}

export function requestDelTodo(idx){
    loading();
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
            hideLoading();
        }, 500)
    })
}

export function requestGetTodo(){
    loading();
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            let res = {
                todos: [{text:'buy cosmestics',completed:true},{text:'buy buy buy',completed:false}]
            };
            resolve(res);
            hideLoading();
        }, 1000)
    })
}

const loading = () =>{
    let container = document.querySelector(".container");
    let div = document.createElement("div");
    div.className = "loading-div";
    ReactDOM.render(<RequestLoading/>,div);
    container.appendChild(div);
};

const hideLoading = ()=>{
    let container = document.querySelector(".container");
    let div = document.querySelector(".loading-div");
    container.removeChild(div);
};