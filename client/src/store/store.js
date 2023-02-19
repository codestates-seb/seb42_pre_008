
import { configureStore } from '@reduxjs/toolkit'
import questionDataReducer from '../reducer/questionSlice'

const store = configureStore({
  reducer: {
    questiondata: questionDataReducer,
  },
});
export default store