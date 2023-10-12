export const initialStateLogIn = {
  accountList: [
    {
      fullName: "Christian Patrick Nebab",
      email: "dongyang00016@gmail.com",
      password: "pat123",
    },
    {
      fullName: "Jeff Binas",
      email: "jeff@gmail.com",
      password: "jeff123",
    },
  ],
  passwordInput: "",
  emailInput: "",
  fullNameInput: "",
  emailSignUpInput: "",
  password1SignUpInput: "",
  password2SignUpInput: "",
};

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
    case "LOGIN_SUCCESS":
      return {
        ...state,
        adminUserError: "",
        adminPasswordError: "",
        validError: "",
      };
    case "CREATE_ACCOUNT": {
      const {
        fullNameInput,
        emailSignUpInput,
        password1SignUpInput,
        accountList,
      } = state;
      const account = {
        fullName: fullNameInput,
        email: emailSignUpInput,
        password: password1SignUpInput,
      };

      const updateAccountList = [...accountList, account];

      console.log(updateAccountList);
      return {
        ...state,
        accountList: updateAccountList,
      };
    }

    default:
      return state;
  }
}
