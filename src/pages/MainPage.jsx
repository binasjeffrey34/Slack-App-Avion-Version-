import { SideBar } from "../components/SideBar";
import { Header } from "../components/Header";
import { ChatPage } from "../components/ChatPage";
import { useAccountContext } from "../Context/AccountContext";
import { useNavigate } from "react-router-dom";

export function MainPage() {
  const { state } = useAccountContext();

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
  const navigate = useNavigate();
  return (
    <section className="text-white  text-4xl text-center">
      {" "}
      <div>
        <i
          className="fa-solid fa-right-from-bracket cursor-pointer"
          onClick={() => navigate("/")}
        ></i>
      </div>
    </section>
  );
}

function ProfilePage() {
  return (
    <section className="bg-white shadow-[0_0_1rem_rgba(0,0,0,0.2)] relative">
      ProfilePage
    </section>
  );
}
