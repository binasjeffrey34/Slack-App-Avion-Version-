import { SideBar } from "../components/SideBar/SideBar";
import { HeaderDashBoard } from "../components/HeaderDashboard/HeaderDashBoard";
import { useAccountContext } from "../Context/AccountContext";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { AddUserChannel } from "../components/AddUserChannel/AddUserChannel";
import { FormAddUser } from "../components/AddUserChannel/FormAddUser";
import useAllUsers from "../hooks/useAllUsers";
import useOpenProfile from "../hooks/useOpenProfile";
import { SidebarIcon } from "../components/SidebarIcon/SidebarIcon";
import useChannelMembers from "../hooks/useChannelMembers";
import { FormCreatingChannel } from "../components/Forms/FormCreatingChannel";

export function Dashboard() {
  const { userId, channelId } = useParams();
  const { state } = useAccountContext();
  const { isOpenChannelForm, isOpenAddUserForm, isOpenAddUserChannel } = state;
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  useAllUsers();
  useChannelMembers(channelId, "GET_ALL_MEMBER");
  useOpenProfile(userId, "isProfileOpen", true);
  useOpenProfile(id, "isDirectMessageOpen", true);

  return (
    <main
      className={`main__page  h-screen overflow-hidden ${
        isOpenAddUserChannel || isOpenAddUserForm ? "overlay" : ""
      } ${isOpenAddUserForm || isOpenChannelForm ? "overlay-form" : ""}  `}
    >
      <HeaderDashBoard />
      <div className="grid grid-cols-[clamp(5rem,7vw,7rem),auto] h-[94.5vh] md:[h-[95.5vh]]  ">
        <SidebarIcon />
        <div className="rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-[30rem,auto] relative">
          <SideBar />
          <div className="grid grid-cols-[2fr,auto]">
            <Outlet />
          </div>
        </div>
      </div>
      {isOpenAddUserChannel && <AddUserChannel />}
      {isOpenAddUserForm && <FormAddUser />}
      {isOpenChannelForm && <FormCreatingChannel />}
    </main>
  );
}
