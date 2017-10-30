import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/RED_index.js';
import { createLogger } from 'redux-logger';//логгер, который красиво выводит состояния в консоль
import thunk from 'redux-thunk';


export default function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger));

  return store;
}