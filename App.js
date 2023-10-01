import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import Home from './Screens/home';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import todosReducer from './Redux/tasksReducer'
const store = configureStore({
  reducer: {
    todos: todosReducer,
  }
})

export default function App() {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
}
