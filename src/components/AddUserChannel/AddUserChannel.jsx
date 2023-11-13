import { useAccountContext } from "../../Context/AccountContext";
import { AllMemberList } from "./AllMemberList";
import { SearchMember } from "./SearchMember";
import { AddPeople } from "./AddPeople";
import { useParams } from "react-router-dom";
import ChannelAbout from "../ChannelMessages/ChannelAbout";

export function AddUserChannel() {
  const { state, handleModal, dispatch } = useAccountContext();
  const { allChannels, numbersOfUser, activeTab } = state;
  const { channelId } = useParams();

  const findChannel = allChannels.find((channel) => channel?.id === +channelId);

  const handleOpenMemberTab = (active) => {
    // Call handleModal to open the modal and set activeTab to "member".

    dispatch({ type: "SET_ACTIVE_TAB", payload: active });
  };

  return (
    <section className="absolute  top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-[0_0_1rem_rgba(0,0,0,0.1)] z-20 bg-white w-[clamp(30rem,90%,55rem)] h-[80vh]  rounded-lg overflow-hidden">
      <i
        className="fa-solid fa-xmark absolute top-12 right-12 text-3xl md:text-4xl cursor-pointer"
        onClick={() => handleModal("isOpenAddUserChannel", false)}
      ></i>
      <div className="px-12 pt-12">
        <p className="text-3xl md:text-4xl font-bold flex item-center gap-2 mb-6 ">
          {" "}
          <span>
            <i className="fa-solid fa-hashtag"></i>
          </span>
          <span>{findChannel?.name}</span>
        </p>
      </div>

      <ul className="flex items-center gap-12 px-12 pt-4 text-xl md:text-2xl border-b-[1px] border-slate-300 ">
        <li
          onClick={() => handleOpenMemberTab("about")}
          className={`cursor-pointer pb-4 ${
            activeTab === "about" ? "active__tab" : ""
          }`}
        >
          About
        </li>
        <li
          onClick={() => handleOpenMemberTab("member")}
          className={`cursor-pointer pb-4 ${
            activeTab === "member" ? "active__tab" : ""
          }`}
        >
          Member <span className="font-medium">{numbersOfUser}</span>
        </li>
      </ul>
      {activeTab === "about" && <ChannelAbout />}
      {activeTab === "member" && <Members />}
    </section>
  );
}
function Members() {
  return (
    <div className="px-12 pt-8 w-full h-full">
      <SearchMember />
      <AddPeople />
      <div className="channel__member-list flex flex-col gap-4">
        <AllMemberList />
      </div>
    </div>
  );
}
