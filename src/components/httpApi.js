//import fetch from 'isomorphic-fetch';
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
    let div = document.createElement("div");
    div.style.width = "300px";
    div.style.height = "150px";
    div.style.position="absolute";
    div.style.top = 0;
    div.style.left = 0;
    div.style.backgroundColor = "rgba(255,255,255,.5)";
    div.className = "loading";
    div.innerHTML="<p style='margin-top: 62px;text-align: center;'>loading...</p>";
    document.body.appendChild(div);
};

const hideLoading = ()=>{
    let div = document.querySelector(".loading");
    document.body.removeChild(div);
};