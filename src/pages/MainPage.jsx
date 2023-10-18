import { SideBar } from "../components/SideBar";
import { Header } from "../components/Header";
import { ChatPage } from "../components/ChatPage";
import { useAccountContext } from "../Context/AccountContext";
import { useNavigate } from "react-router-dom";
import { ProfilePage } from "./ProfilePage";
import { useEffect } from "react";
import { axiosFetch } from "../api/api-get";

export function MainPage() {
  const { state } = useAccountContext();

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
        state.isOpenChannelForm || state.isOpenAddUserForm ? "overlay" : ""
      } `}
    >
      <Header />
      <SideBarIcon />
      <div className="grid grid-cols-[1fr,2fr,1fr] rounded-lg overflow-hidden ">
        <SideBar />
        <ChatPage />
        <ProfilePage />
      </div>
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
