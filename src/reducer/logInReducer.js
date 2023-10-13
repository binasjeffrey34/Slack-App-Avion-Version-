export function logInReducer(state, action) {
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
    case "LOGIN_INVALID":
      return {
        ...state,
        validError: action.payload,
        isvalidError: true,
      };
    case "LOGIN_SUCCESSFUL": {
      localStorage.setItem("logInAccount", JSON.stringify(action.payload));
      return {
        ...state,
        passwordInput: "",
        emailInput: "",
        logInAccount: action.payload,
      };
    }
    case "CREATE_ACCOUNT": {
      const {
        fullNameInput,
        emailSignUpInput,
        password1SignUpInput,
        accountList,
      } = state;
      const account = {
        id: crypto.randomUUID(),
        fullName: fullNameInput,
        email: emailSignUpInput,
        password: password1SignUpInput,
        channelList: [],
        selectedChannel: null,
      };

      const updateAccountList = [...accountList, account];

      localStorage.setItem("accountList", JSON.stringify(updateAccountList));
      return {
        ...state,
        accountList: updateAccountList,
      };
    }
    case "SHOW_MODALCHANNELFORM":
      return { ...state, isOpenChannelForm: action.payload };

    case "CREATE_CHANNEL": {
      const { channelName, logInAccount, accountList } = state;
      const createChannel = {
        id: crypto.randomUUID(),
        channelName,
        userAddedAccount: [],
      };
      const updateChannelList = [...logInAccount.channelList, createChannel];

      const updateLogInAccount = {
        ...logInAccount,
        channelList: updateChannelList,
      };
      const updateAccountList = accountList.map((acc) =>
        acc.id === logInAccount.id
          ? { ...acc, channelList: updateChannelList }
          : acc
      );
      localStorage.setItem("logInAccount", JSON.stringify(updateLogInAccount));
      localStorage.setItem("accountList", JSON.stringify(updateAccountList));

      return {
        ...state,
        accountList: updateAccountList,
        logInAccount: updateLogInAccount,
        channelName: "",
        isOpenChannelForm: false,
      };
    }
    case "SELECT_CHANNEL": {
      const { logInAccount, accountList } = state;
      const getSelectedChannel = logInAccount?.channelList?.find(
        (list) => list.id === action.payload
      );

      const updateLogInAccount = {
        ...logInAccount,
        selectedChannel: getSelectedChannel,
      };

      const updateAccountList = accountList.map((acc) =>
        acc.id === logInAccount.id
          ? { ...acc, selectedChannel: getSelectedChannel }
          : acc
      );
      localStorage.setItem("logInAccount", JSON.stringify(updateLogInAccount));
      localStorage.setItem("accountList", JSON.stringify(updateAccountList));

      return {
        ...state,
        accountList: updateAccountList,
        logInAccount: updateLogInAccount,
      };
    }
    case "SHOW_MODALADDUSERFORM":
      return { ...state, isOpenAddUserForm: action.payload };
    case "ADD_USER": {
      const { accountList, user, logInAccount } = state;

      const findUser = accountList.find(
        (acc) => acc.fullName.split(" ")[0].toLowerCase() === user.toLowerCase()
      );
      const updateChannelList = logInAccount.channelList.map((channel) =>
        channel.id === logInAccount.selectedChannel.id
          ? {
              ...channel,
              userAddedAccount: [...channel.userAddedAccount, findUser],
            }
          : channel
      );
      console.log(updateChannelList);
      const updateLogInAccount = {
        ...logInAccount,
        selectedChannel: {
          ...logInAccount.selectedChannel,
          userAddedAccount: [
            ...logInAccount.selectedChannel.userAddedAccount,
            findUser,
          ],
        },
        channelList: updateChannelList,
      };

      const updateAccountList = accountList.map((acc) =>
        acc.id === logInAccount.id
          ? {
              ...acc,
              selectedChannel: {
                ...acc.selectedChannel,
                userAddedAccount: [
                  ...acc.selectedChannel.userAddedAccount,
                  findUser,
                ],
              },
              channelList: updateChannelList,
            }
          : acc
      );
      localStorage.setItem("logInAccount", JSON.stringify(updateLogInAccount));
      localStorage.setItem("accountList", JSON.stringify(updateAccountList));

      return {
        ...state,
        accountList: updateAccountList,
        logInAccount: updateLogInAccount,
        user: "",
      };
    }

    case "DELETE_CHANNEL": {
      const { logInAccount, accountList } = state;
      // const {}
      const updateChannelList = logInAccount.channelList.filter(
        (channel) => channel.id !== action.payload
      );

      const updateLogInAccount = {
        ...logInAccount,
        channelList: updateChannelList,
      };
      const updateAccountList = accountList.map((acc) =>
        acc.id === logInAccount.id
          ? { ...acc, channelList: updateChannelList }
          : acc
      );
      localStorage.setItem("logInAccount", JSON.stringify(updateLogInAccount));
      localStorage.setItem("accountList", JSON.stringify(updateAccountList));

      return {
        ...state,
        accountList: updateAccountList,
        logInAccount: updateLogInAccount,
      };
    }
    default:
      return state;
  }
}
