import{ createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './todoReducer';

const todoStore = createStore(rootReducer, applyMiddleware(thunk));

export default todoStore;