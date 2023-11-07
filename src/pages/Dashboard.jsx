import { SideBar } from "../components/SideBar/SideBar";
import { HeaderDashBoard } from "../components/HeaderDashboard/HeaderDashBoard";
import { useAccountContext } from "../Context/AccountContext";
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AddUserChannel } from "../components/AddUserChannel/AddUserChannel";
import { FormAddUser } from "../components/AddUserChannel/FormAddUser";
import useAllUsers from "../hooks/useAllUsers";
import useOpenProfile from "../hooks/useOpenProfile";

export function Dashboard() {
  const { userId } = useParams();
  const { state } = useAccountContext();
  const { isOpenChannelForm, isOpenAddUserForm, isOpenAddUserChannel } = state;
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useAllUsers();
  useOpenProfile(userId, "isProfileOpen", true);
  useOpenProfile(id, "isDirectMessageOpen", true);

  return (
    <main
      className={`main__page grid grid-cols-[5%,95%] grid-rows-[5%,95%] h-screen ${
        isOpenAddUserChannel || isOpenAddUserForm || isOpenChannelForm
          ? "overlay"
          : ""
      } ${isOpenAddUserForm ? "overlay-form" : ""} `}
    >
      <HeaderDashBoard />
      <LogOut />
      <div className="grid grid-cols-[30rem,auto] rounded-lg   overflow-hidden ">
        <SideBar />
        <div className="grid grid-cols-[2fr,auto]">
          <Outlet />
        </div>
      </div>
      {isOpenAddUserChannel && <AddUserChannel />}
      {isOpenAddUserForm && <FormAddUser />}
    </main>
  );
}

function LogOut() {
  const { dispatch } = useAccountContext();

  const navigate = useNavigate();
  return (
    <section className="text-white  text-4xl text-center">
      {" "}
      <div>
        <i
          className="fa-solid fa-right-from-bracket cursor-pointer"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "LOG_OUT" });
            navigate("/");
          }}
        ></i>
      </div>
    </section>
  );
}
