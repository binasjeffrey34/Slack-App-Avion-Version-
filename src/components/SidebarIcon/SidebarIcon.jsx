import { AccountProfile } from "./AccountProfile";
import { useState } from "react";
import { LogOut } from "./LogOut";
import { useAccountContext } from "../../Context/AccountContext";

export function SidebarIcon() {
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);
  const { dispatch } = useAccountContext();

  return (
    <section className="text-white  text-3xl text-center flex flex-col items-center justify-between">
      <div className=" flex flex-col gap-8">
        <p
          className="flex flex-col items-center gap-1"
          onClick={() => dispatch({ type: "OPEN_MODAL_SIDEBAR" })}
        >
          <i className="fa-solid fa-house text-xl md:text-2xl py-2 md:py-3 px-3 md:px-4 bg-[rgba(255,255,255,0.3)] rounded-xl cursor-pointer "></i>
          <span className="text-lg md:text-xl block">Home</span>
        </p>
        <p className="flex flex-col items-center gap-1">
          <i className="fa-regular fa-comments text-2xl md:text-3xl py-2 md:py-3 px-3 md:px-4 hover:bg-[rgba(255,255,255,0.3)]  rounded-xl  cursor-pointer"></i>
          <span className="text-lg md:text-xl block">DMs</span>
        </p>
        <p className="flex flex-col items-center gap-1">
          <i className="fa-regular fa-bell text-2xl md:text-3xl py-2 md:py-3 px-3 md:px-4 hover:bg-[rgba(255,255,255,0.3)] rounded-xl  cursor-pointer"></i>
          <span className="text-lg md:text-xl block">Activity</span>
        </p>
        <p className="flex flex-col items-center gap-1">
          <i className="fa-solid fa-ellipsis text-2xl md:text-3xl py-2 md:py-3 px-3 md:px-4 hover:bg-[rgba(255,255,255,0.3)] rounded-xl  cursor-pointer"></i>
          <span className="text-lg md:text-xl block">More</span>
        </p>
      </div>
      <AccountProfile onSetOpenProfile={setIsModalProfileOpen} />

      {isModalProfileOpen && (
        <LogOut onSetOpenProfile={setIsModalProfileOpen} />
      )}
    </section>
  );
}
