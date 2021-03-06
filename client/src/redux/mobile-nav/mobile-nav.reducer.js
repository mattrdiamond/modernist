import MobileNavActionTypes from "./mobile-nav.types";

const INITIAL_STATE = {
  isVisible: false,
};

const mobileNavReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MobileNavActionTypes.TOGGLE_NAV:
      return {
        isVisible: !state.isVisible,
      };
    default:
      return state;
  }
};

export default mobileNavReducer;
