import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//import masterReducer from './Reducers/MasterReducer';


const store = createStore(masterReducer, applyMiddleware(thunk));

export default store;
