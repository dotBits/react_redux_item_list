import { createStore, applyMiddleware, compose } from 'redux';
import reducer  from "./reducers/index.js"

// redux middleware section
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

const loggerMiddleware = createLogger();
let middleware;

// loggerMiddleware will be available only in development mode
if(process.env.NODE_ENV === 'development') {
  middleware = applyMiddleware(loggerMiddleware, thunk);
} else {
  middleware = applyMiddleware(thunk);
}

let Store = createStore(reducer, compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f));

export default Store
