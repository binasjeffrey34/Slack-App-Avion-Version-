export const initialState = {
  accountLogIn: JSON.parse(localStorage.getItem("accountLogin")) || null,
  emailInput: "",
  passwordInput: "",
  channelName: "",
  workSpaceName: JSON.parse(localStorage.getItem("workSpaceName")) || "",
  userId: "",
  emailSignUpInput: "",
  password1: "",
  password2: "",
  workSpaceInput: "",
  addUserInput: "",
  searchMemberInput: "",
  messageChannelInput: "",
  activeTab: "about",
  numbersOfUser: 0,
  allUsers: JSON.parse(localStorage.getItem("allUsers")) || [],
  filteredAllUsers: [],
  allDirectMessage: JSON.parse(localStorage.getItem("allDirectMessage")) || [],
  filteredListMember: [],
  channelListMember: [],
  channelMessages: [],
  userMessages: [],
  allChannels: JSON.parse(localStorage.getItem("allChannels")) || [],
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
  selectedProfile: JSON.parse(localStorage.getItem("selectedProfile")) || null,
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  isOpenChannelForm: false,
  isOpenAddUserChannel: false,
  isOpenAddUserForm: false,
  isProfileOpen: false,
  isOpenWorkSpace: false,
  isDirectMessageOpen: false,
  isOpenLink: false,
  messageUserInput: "",

};
