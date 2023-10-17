export function reducer(state, action) {
  switch (action.type) {
    case "SET_INPUT": {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
        [`${name}Error`]: "",
        [`is${name}Error`]: false,
      };
    }
    case "VALIDATE_INPUT": {
      const { field, message } = action.payload;
      return {
        ...state,
        [`${field}Error`]: message,
        [`is${field}Error`]: true,
        validError: "",
      };
    }
    case "LOG_IN_SUCCESS": {
      return {
        ...state,
        accountLogIn: action.payload,
        emailInput: "",
        passwordInput: "",
        isloggedIn: true,
      };
    }
    case "LOG_OUT": {
      return {
        ...state,
        isloggedIn: false,
      };
    }
    case "SHOW_MODALCHANNELFORM":
      return { ...state, isOpenChannelForm: action.payload };
    case "SHOW_MODALADDUSERFORM":
      return { ...state, isOpenAddUserForm: action.payload };
    default:
      return state;
  }
}
