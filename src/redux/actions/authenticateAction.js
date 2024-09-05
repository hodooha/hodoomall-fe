import { authActions } from "../reducers/authenticateReducer";

function login() {
  return (dispatch, getState) => {
    dispatch(authActions.login({ data }));
  };
}

export const authenticateAction = { login };
