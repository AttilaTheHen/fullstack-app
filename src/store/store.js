import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './promise-middleware';
import { error, loading } from '../components/app/reducers';
import { game, moves } from '../components/game/reducers';
import { user, checkedAuth } from '../components/auth/reducers';
import { games, stats, leaders } from '../components/dashboard/reducers';

const rootReducer = combineReducers({
  error,
  loading,
  user,
  checkedAuth,
  games,
  game,
  moves,
  stats,
  leaders
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      promiseMiddleware
    )
  )
);

export default store;