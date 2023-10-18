import { SideBar } from "../components/SideBar";
import { Header } from "../components/Header";
import { ChatPage } from "../components/ChatPage";
import { useAccountContext } from "../Context/AccountContext";
import { useNavigate, useParams } from "react-router-dom";
import { ProfilePage } from "./ProfilePage";
import { useEffect } from "react";
import { axiosFetch } from "../api/api-get";
import { API_URL } from "../constant/apiUrl";
import profileLogo from "../assets/profilelogo.png";
import { AddUserChannel } from "../components/AddUserChannel/AddUserChannel";
import { FormAddUser } from "../components/AddUserChannel/FormAddUser";

export function MainPage() {
  const { channelName } = useParams();
  const { state, dispatch } = useAccountContext();
  const {
    isOpenChannelForm,
    isOpenAddUserForm,
    isOpenAddUserChannel,
    isProfileOpen,
  } = state;


  useEffect(() => {
    if (channelName) {
      dispatch({
        type: "SHOW_MODAL",
        payload: { name: "isProfileOpen", value: true },
      });
    }
  }, [dispatch, channelName]);

  useEffect(() => {
    async function getAllUsersChannel() {
      const res = await axiosFetch.get(`${API_URL}/api/v1/users`);

      const getAlluser = res.data.data.map((user) => ({
        ...user,
        name: user.email.split("@")[0],
        image: profileLogo,
      }));
      console.log(getAlluser);
      dispatch({ type: "GET_ALL_USERS", payload: getAlluser });
    }
    getAllUsersChannel();
  }, [dispatch]);

  // useEffect(() => {
  //   async function getUser() {
  //     const res = await axiosFetch.get("/api/v1/users");
  //     console.log(res.data.data);
  //   }
  //   getUser();
  // }, []);


  return (
    <main
      className={`main__page grid grid-cols-[6rem,1fr] grid-rows-[4rem,4fr] min-h-screen ${
        isOpenAddUserChannel || isOpenAddUserForm || isOpenChannelForm
          ? "overlay"
          : ""
      } ${isOpenAddUserForm ? "overlay-form" : ""} `}
    >
      <Header />
      <SideBarIcon />
      <div className="grid grid-cols-[1fr,2fr] rounded-tl-lg overflow-hidden ">
        <SideBar />
        <div className="grid grid-cols-[2fr,auto]">
          <ChatPage />
          {isProfileOpen && <ProfilePage />}
        </div>
      </div>
      {isOpenAddUserChannel && <AddUserChannel />}
      {isOpenAddUserForm && <FormAddUser />}
    </main>
  );
}

function SideBarIcon() {
  const { dispatch } = useAccountContext();

  const navigate = useNavigate();
  return (
    <section className="text-white  text-4xl text-center">
      {" "}
      <div>
        <i
          className="fa-solid fa-right-from-bracket cursor-pointer"
          onClick={() => {
            dispatch({ type: "LOG_OUT" });
            navigate("/");
          }}
        ></i>
      </div>
    </section>
  );
}
