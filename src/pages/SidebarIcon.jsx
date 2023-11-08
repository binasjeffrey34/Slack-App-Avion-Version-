import { useNavigate } from "react-router-dom";
import { AccountProfile } from "../components/AccountProfile";
import { useState } from "react";
import { useAccountContext } from "../Context/AccountContext";

export function SidebarIcon() {
  const [isModalProfileOpen, setIsModalProfileOpen] = useState();

  return (
    <section className="text-white  text-3xl text-center flex flex-col items-center justify-around">
      <div className=" flex flex-col gap-8">
        <p className="flex flex-col items-center gap-1">
          <i className="fa-solid fa-house text-2xl py-3 px-4 bg-[rgba(255,255,255,0.3)] rounded-xl cursor-pointer "></i>
          <span className="text-xl block">Home</span>
        </p>
        <p className="flex flex-col items-center gap-1">
          <i className="fa-regular fa-comments text-3xl py-3 px-4 hover:bg-[rgba(255,255,255,0.3)]  rounded-xl  cursor-pointer"></i>
          <span className="text-xl block">DMs</span>
        </p>
        <p className="flex flex-col items-center gap-1">
          <i className="fa-regular fa-bell text-3xl py-3 px-4 hover:bg-[rgba(255,255,255,0.3)] rounded-xl  cursor-pointer"></i>
          <span className="text-xl block">Activity</span>
        </p>
        <p className="flex flex-col items-center gap-1">
          <i className="fa-solid fa-ellipsis text-3xl py-3 px-4 hover:bg-[rgba(255,255,255,0.3)] rounded-xl  cursor-pointer"></i>
          <span className="text-xl block">More</span>
        </p>
      </div>
      <AccountProfile onSetOpenProfile={setIsModalProfileOpen} />
      {isModalProfileOpen && <LogOut />}
    </section>
  );
}

function LogOut() {
  const {
    dispatch,
    state: { accountLogIn, allUsers },
  } = useAccountContext();
  const navigate = useNavigate();
  const findAccount = allUsers.find((user) => user.id === accountLogIn.id);
  const account = findAccount && {
    ...accountLogIn,
    image: findAccount.image,
    name: accountLogIn.email.split("@")[0],
  };
  return (
    <div className="absolute bottom-10  left-24 bg-slate-100 text-gray-600 text-2xl  w-[27rem] h-[27rem] z-50 shadow-[0_5px_1.5rem_rgba(0,0,0,0.15)] rounded-lg text-left">
      <div className="pt-8 px-10 pb-6 border-b-[1px] flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img src={account.image} alt="" className="w-16 h-16" />
          <p>
            <span className="block font-bold text-2xl">
              {accountLogIn.name}
            </span>
            <span>
              {" "}
              <i className="fa-solid fa-caret-right text-green-600  rotate-45 text-4xl relative top-1.5"></i>{" "}
              Active
            </span>
          </p>
        </div>
        <p>
          Set yourself as <strong>Away</strong>
        </p>
        <p className="flex items-center justify-between">
          <span>Pause notifications</span>
          <i className="fa-solid fa-angle-right text-gray-400 text-xl"></i>
        </p>
      </div>
      <ul className="py-6 px-10  border-b-[1px] flex flex-col">
        <li className="mb-4">Profile</li>
        <li>Preference</li>
        <li></li>
      </ul>
      <p
        onClick={() => {
          localStorage.clear();
          dispatch({ type: "LOG_OUT" });
          navigate("/");
        }}
        className="py-6 px-10 cursor-pointer "
      >
        Sign Out
      </p>
    </div>
  );
}
