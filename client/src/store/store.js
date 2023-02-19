
//redux 필요여부 확인후 삭제
import { configureStore } from '@reduxjs/toolkit'
import questionDataReducer from '../reducer/questionSlice'

const store = configureStore({
  reducer: {
    questiondata: questionDataReducer,
  },
});
export default store