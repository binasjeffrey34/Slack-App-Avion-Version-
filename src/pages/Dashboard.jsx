import { SideBar } from "../components/SideBar";
import { Header } from "../components/Header";
import { useAccountContext } from "../Context/AccountContext";
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect } from "react";
import { axiosFetch } from "../api/api-get";
import profileLogo from "../assets/profilelogo.png";
import { AddUserChannel } from "../components/AddUserChannel/AddUserChannel";
import { FormAddUser } from "../components/AddUserChannel/FormAddUser";

export function MainPage() {
  const { userId } = useParams();
  const { state, dispatch } = useAccountContext();
  const { isOpenChannelForm, isOpenAddUserForm, isOpenAddUserChannel } = state;
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (userId) {
      dispatch({
        type: "SHOW_MODAL",
        payload: { name: "isProfileOpen", value: true },
      });
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (id) {
      dispatch({
        type: "SHOW_MODAL",
        payload: { name: "isDirectMessageOpen", value: true },
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    async function getAllUsersChannel() {
      const res = await axiosFetch.get(`/api/v1/users`);

      const allUsers = res.data.data.map((user) => ({
        ...user,
        name: user.email.split("@")[0],
        image: profileLogo,
        messages: [],
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
          <Outlet />
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