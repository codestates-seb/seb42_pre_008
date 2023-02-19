//redux 필요여부 확인 후 삭제
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
  }
  
  export const questionDataSlice = createSlice({
    name: 'questionData',
    initialState,
    reducers: {
      read: (state, action) => {
        state.value = action.payload
      },
    },
  })
  
  export const { read } = questionDataSlice.actions
  export default questionDataSlice.reducer