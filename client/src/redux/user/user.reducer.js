import UserActionTypes from "./user.types.js";

const INITIAL_STATE = {
  currentUser: null,
  favorites: {},
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      const { id, displayName, email, createdAt, favorites } = action.payload;
      return {
        ...state,
        currentUser: { id, displayName, email, createdAt },
        favorites: favorites,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        favorites: {},
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.ADD_FAVORITE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: { ...state.favorites, [action.payload.id]: action.payload },
      };

    default:
      return state;
  }
};

export default userReducer;