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
    // case "LOG_OUT": {
    //   return {
    //     ...state,
    //     isloggedIn: false,
    //   };
    // }

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
        status: "success",
      };
    }
    case "GET_USERS-CHANNEL-FAILED":
      return { ...state, status: "error" };
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
        return { ...state, getAllChannels: action.payload }

        case "MESSAGE_TO_CHANNELS":
          return { ...state, sendMessageToChannel: action.payload }

    default:
      return state;
  }
}
