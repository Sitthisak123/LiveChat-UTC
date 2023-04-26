import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Friend_data: []
};

export const FriendsStatusSlice = createSlice({
  name: 'Relation-Data',
  initialState,
  reducers: {
    CREATE_FRIENDS_STATUS: (state, action) => {
      const relations = action.payload;
      const uniqueRelations = relations.reduce((acc, curr) => {
        const { fk_user_one, fk_user_two } = curr;
        const isDuplicate = acc.some(item => (
          item.fk_user_one === fk_user_one && item.fk_user_two === fk_user_two
        ));
        if (!isDuplicate) {
          acc.push(curr);
        }
        return acc;
      }, []);
      state.Friend_data = uniqueRelations;
    },
    CREATE_ONCE_FRIENDS_STATUS: (state, action) => {
      const relations = action.payload;
      state.Friend_data.push(relations);
    },

    UPDATE_FRIENDS_STATUS: (state, action) => {
      const index = state.Friend_data.findIndex(Friend => (Friend.fk_user_one === action.payload.fk_user_one && Friend.fk_user_two === action.payload.fk_user_two) || (Friend.fk_user_one === action.payload.fk_user_two && Friend.fk_user_two === action.payload.fk_user_one));
      state.Friend_data[index] = { ...state.Friend_data[index], ...action.payload };
    },
    DELETE_FRIENDS_STATUS: (state, action) => {
      state.Friend_data = state.Friend_data.filter(
        Friend => (Friend.fk_user_one !== action.payload.fk_user_one || Friend.fk_user_two !== action.payload.fk_user_two)
          && (Friend.fk_user_one !== action.payload.fk_user_two || Friend.fk_user_two !== action.payload.fk_user_one)
      );
    },
    CLEAR_FRIENDS_STATUS: (state, action) => {
      state.Friend_data = [];
    }
  },
});

export const { CREATE_FRIENDS_STATUS, CREATE_ONCE_FRIENDS_STATUS, UPDATE_FRIENDS_STATUS, DELETE_FRIENDS_STATUS, CLEAR_FRIENDS_STATUS } = FriendsStatusSlice.actions;
export default FriendsStatusSlice.reducer;
