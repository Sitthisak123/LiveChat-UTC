export function UserReducer(state, action) {
    if (action.type === "allUser") {
      return state;
    } else if (action.type === "allFind") {
      return 'allFind return';
    }
  }