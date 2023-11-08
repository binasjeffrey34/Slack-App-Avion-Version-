import { initialState } from "./initialState";

export function reducer(state, action) {
  switch (action.type) {
    case "CREATE_CHANNEL":
      return { ...state, channelName: "", userId: "" };
    case "CREATE_ACCOUNT":
      return {
        ...state,
        emailSignUpInput: "",
        password1: "",
        password2: "",
        validError: "",
        isvalidError: false,
      };
    case "CREATE_WORK_SPACE":
      return { ...state, workSpaceName: action.payload, workSpaceInput: "" };
    case "SET_INPUT": {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
        [`${name}Error`]: "",
        [`is${name}Error`]: false,
        validError: "",
        isvalidError: false,
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
    case "INVALID_INPUT":
      return {
        ...state,
        validError: action.payload,
        isvalidError: true,
      };
    case "LOG_IN":
      return {
        ...state,
        accountLogIn: action.payload,
        emailInput: "",
        passwordInput: "",
        validError: "",
        isvalidError: false,
        isAuthenticated: true,
      };
    case "LOG_OUT": {
      return {
        ...initialState,
        isAuthenticated: false,
      };
    }
    case "SHOW_MODAL": {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case "GET_ALL_USERS": {
      return {
        ...state,
        allUsers: action.payload,
        filteredAllUsers: action.payload,
      };
    }

    case "GET_ALL_CHANNELS": {
      return {
        ...state,
        allChannels: action.payload,
      };
    }
    case "NUMBER_OF_USERS":
      return { ...state, numbersOfUser: action.payload };
    case "STORE_ADDED_USER_TO_CHANNEL":
      return { ...state, allChannelUser: action.payload, addUserInput: "" };
    case "GET_ALL_MEMBER":
      return {
        ...state,
        channelListMember: action.payload,
        filteredListMember: action.payload,
      };
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
    case "ADD_MEMBER": {
      const { allUsers } = state;
      const query = action.payload.toLowerCase();

      const filteredAllUsers = query
        ? allUsers.filter(
            (user) =>
              user.name.toLowerCase().includes(query) ||
              user.email.toLowerCase().includes(query)
          )
        : allUsers;

      return { ...state, filteredAllUsers };
    }
    case "SELECT_ADD_MEMBER":
      return { ...state, addUserInput: action.payload };
    case "SELECTED_USER":
      return { ...state, selectedUser: action.payload };
    case "SELECTED_PROFILE":
      return { ...state, selectedProfile: action.payload };
    case "DELETE_USER_DIRECT_MESSAGE": {
      const { allDirectMessage } = state;
      const upDateAllDirectMessage = allDirectMessage.filter(
        (directmsg) => directmsg.id !== action.payload
      );

      localStorage.setItem(
        "allDirectMessage",
        JSON.stringify(upDateAllDirectMessage)
      );
      return { ...state, allDirectMessage: upDateAllDirectMessage };
    }

    case "STORE_TO_DIRECT_MESSAGE": {
      const { allUsers, allDirectMessage } = state;

      const findUser = allUsers?.find((user) => user.id === +action.payload);
      if (allDirectMessage.some((user) => user?.id === findUser?.id)) {
        return state;
      }
      const upDateAllDirectMessage = [...allDirectMessage, findUser];

      localStorage.setItem(
        "allDirectMessage",
        JSON.stringify(upDateAllDirectMessage)
      );
      return { ...state, allDirectMessage: upDateAllDirectMessage };
    }
    case "MESSAGE_TO_CHANNELS":
      return { ...state, messageChannelInput: "" };
    case "MESSAGE_TO_USERS":
      return { ...state, messageUserInput: "" };

    case "FETCH_CHANNEL_MESSAGE":
      return { ...state, channelMessages: action.payload };
    case "FETCH_USERS_MESSAGE":
      return { ...state, userMessages: action.payload };

    case "SET_ACTIVE_TAB":
      return {...state, activeTab: action.payload};

    default:
      throw new Error("Unknown Action");
  }
}
