import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/reducers';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  if (process.env.NODE_ENV === 'development') {
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
      ),
    );
  }

  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
    ),
  );
}
