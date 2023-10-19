import { SideBar } from "../components/SideBar";
import { Header } from "../components/Header";
import { ChatPage } from "../components/ChatPage";
import { useAccountContext } from "../Context/AccountContext";
import { useNavigate, useParams } from "react-router-dom";
import { ProfilePage } from "./ProfilePage";
import { useEffect } from "react";
import { axiosFetch } from "../api/api-get";
import profileLogo from "../assets/profilelogo.png";
import { AddUserChannel } from "../components/AddUserChannel/AddUserChannel";
import { FormAddUser } from "../components/AddUserChannel/FormAddUser";

export function MainPage() {
  const { userId } = useParams();
  const { state, dispatch } = useAccountContext();
  const {
    isOpenChannelForm,
    isOpenAddUserForm,
    isOpenAddUserChannel,
    isProfileOpen,
  } = state;

  useEffect(() => {
    if (userId) {
      dispatch({
        type: "SHOW_MODAL",
        payload: { name: "isProfileOpen", value: true },
      });
    }
  }, [dispatch, userId]);

  useEffect(() => {
    async function getAllUsersChannel() {
      const res = await axiosFetch.get(`/api/v1/users`);

      const allUsers = res.data.data.map((user) => ({
        ...user,
        name: user.email.split("@")[0],
        image: profileLogo,
      }));

      dispatch({ type: "GET_ALL_USERS", payload: allUsers });
    }
    getAllUsersChannel();
  }, [dispatch]);

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
      <div className="grid grid-cols-[30rem,2fr] rounded-tl-lg overflow-hidden ">
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
            localStorage.clear();
          }}
        ></i>
      </div>
    </section>
  );
}
