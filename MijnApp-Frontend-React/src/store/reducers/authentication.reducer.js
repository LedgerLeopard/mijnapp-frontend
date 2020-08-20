import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name:"auth",
  initialState:[],
  reducers: {
    login(state, action){
      const { user} = action.payload;
      state.push({
        loggingIn: true,
        user
      });
    }
  }
});

export const { login } = authSlice.actions

export default authSlice.reducer;
