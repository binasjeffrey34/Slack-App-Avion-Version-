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
  numbersOfUser: 0,
  allUsers: [],
  allMessage: [],
  allDirectMessage: JSON.parse(localStorage.getItem("allDirectMessage")) || [],
  allChannelUserList: [],
  filteredListMember: [],
  getAllChannels: JSON.parse(localStorage.getItem("getAllChannels")) || [],
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
  selectedProfile: JSON.parse(localStorage.getItem("selectedProfile")) || null,
  isloggedIn: JSON.parse(localStorage.getItem("isloggedIn")) || false,
  isOpenChannelForm: false,
  isOpenAddUserChannel: false,
  isOpenAddUserForm: false,
  isProfileOpen: false,
  isOpenWorkSpace: false,
  isDirectMessageOpen: false,
};
