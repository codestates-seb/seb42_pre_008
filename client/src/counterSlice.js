import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
  }
  
  export const counterSlice = createSlice({
    name: 'tester',
    initialState,
    reducers: {
      read: (state, action) => {
        state.value = action.payload
      },
    },
  })
  
  export const { read } = counterSlice.actions
  export default counterSlice.reducer