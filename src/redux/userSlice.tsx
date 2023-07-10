import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {user: {}},
    reducers: {
        updateUser: (state, action: PayloadAction<{}>) => {
            state.user = action.payload;
            console.log('Sucessfully updated user');
            console.log(state.user);
        }
    }
})

export const {updateUser} = userSlice.actions;
export default userSlice.reducer;