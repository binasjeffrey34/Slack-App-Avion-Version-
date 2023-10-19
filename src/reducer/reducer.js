export function reducer(state, action) {
  switch (action.type) {
    case "CREATE_CHANNEL":
      return { ...state, channelName: "", userId: "" };
    case "CREATE_ACCOUNT":
      return { ...state, emailSignUpInput: "", password1: "", password2: "" };
    case "CREATE_WORK_SPACE":
      return { ...state, workSpaceName: action.payload, workSpaceInput: "" };
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
      localStorage.setItem("isloggedIn", JSON.stringify(true));
      return {
        ...state,
        accountLogIn: action.payload,
        emailInput: "",
        passwordInput: "",
        isloggedIn: true,
      };
    }
    case "LOG_OUT": {
      localStorage.setItem("isloggedIn", JSON.stringify(false));
      return {
        ...state,
        isloggedIn: false,
      };
    }

    case "SHOW_MODAL": {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case "GET_ALL_USERS": {
      return { ...state, allUsers: action.payload };
    }

    case "GET_USERS_CHANNEL": {
      return {
        ...state,
        allChannelUser: action.payload,
        filteredListMember: action.payload,
      };
    }
    case "NUMBER_OF_USERS":
      return { ...state, numbersOfUser: action.payload };
    case "ADD_USER":
      return { ...state, allChannelUser: action.payload, addUserInput: "" };
    case "SEARCH_MEMBER": {
      const { allChannelUser } = state;
      const query = action.payload.toLowerCase();

      const filteredListMember = query
        ? allChannelUser.filter((user) =>
            user.name.toLowerCase().includes(query)
          )
        : allChannelUser;
      return { ...state, filteredListMember };
    }
    case "SELECTED_USER":
      return { ...state, selectedUser: action.payload };

    case "GET_ALL_CHANNELS":
      return { ...state, getAllChannels: action.payload };

    default:
      return state;
  }
}
