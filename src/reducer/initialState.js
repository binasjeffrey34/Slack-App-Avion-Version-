export const initialState = {
  accountLogIn: JSON.parse(localStorage.getItem("accountLogin")) || null,
  status: "loading",
  emailInput: "",
  passwordInput: "",
  channelName: "",
  fullNameInput: "",
  emailSignUpInput: "",
  password1: "",
  password2: "",
  addUserInput: "",
  searchMemberInput: "",
  numbersOfUser: 0,

  allUsers: [],
  allChannelUser: [],
  filteredListMember: [],
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
  // isloggedIn: false,
  isOpenChannelForm: false,
  isOpenAddUserChannel: false,
  isOpenAddUserForm: false,
  isProfileOpen: false,
};
