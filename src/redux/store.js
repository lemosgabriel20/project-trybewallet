import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers/index';
// configure aqui sua store
const store = createStore(rootReducer);

if (window.Cypress) {
  window.store = store;
}

export default store;
