import { configureStore } from '@reduxjs/toolkit'; 
import reducer from './reducers/reducer'; 
 
const initialState = {todos:[]}; 
 
const store = configureStore({ 
  reducer, 
  preloadedState: initialState, 
}); 
 
export default store; 