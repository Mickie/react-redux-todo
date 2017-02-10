# react-redux-todo

using react as ui layer, redux as data layer, react-redux as a connector to pass redux store to react components,
'setState()' is async which will not update 'this.state' immediately.

# Usage

```bash
cd path/to/my-redux-todo
npm install
npm run build
# open path/to/my-redux/index.html in your browser
```

# Watch

Instead of manually building after each change it's possible to automatically recompile the javascript bundle when files change:

```bash
npm run watch
# make javascript changes, then refresh path/to/my-redux-todo/index.html
```

#Refs
###Redux logic:

1.Action creator: return pure javascript object discribe action
```js
 return {
    type: 'add_to_do',
    text: 'more_shopping'
 }
```

2.reducers: (state,action)=>nextState,reducers could be divided into pieces,state
is immutable;
```js
switch (action.type){
    case "add_to_do":
        return [...state,{text:'more shopping',completed: false}]
}
```

3.store: state tree;

```js
let todoStore = createStore(reducer)
todoStore.subscribe(()=>{
   console.log(todoStore.getState());
   //auto-log store content when store got updated, 
   // not use in real case but good for debug.
})
```

dataflow: actions ---> store.dispatch(actionCreator) 
---> state changed through reducers ---> store updated

###Redux-React
connect redux store into react components as state which means views
will got updated when store value changed.
```js
const mapStoreToProps = (store) => { 
    return {
        todos: store //components will reference by this.props.todos 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: ()=> dispatch(ACTIONS.ADD_TO_DO()),
        delTodo: bindActionCreators(ACTIONS.DEL_TO_DO,dispatch) //implicit method down to component unware of redux 
    }
}

const TodoApp = connect(mapStoreToProps,mapDispatchToProps)(myComp);

const App = () =>{
    return(
        <Provider store = {todoStore}>
          <TodoApp />
        </Provider>
    )
}
```




