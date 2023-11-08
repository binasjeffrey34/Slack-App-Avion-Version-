import { useAccountContext } from "../../Context/AccountContext";
import { AllMemberList } from "./AllMemberList";
import { SearchMember } from "./SearchMember";
import { AddPeople } from "./AddPeople";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";
import ChannelAbout from "../ChannelMessages/ChannelAbout";
import useChannelMembers from "../../hooks/useChannelMembers";
import { useState } from "react";

export function AddUserChannel() {
  const { state, handleModal } = useAccountContext();
  const { allChannels, numbersOfUser } = state;
  const { channelId } = useParams();
  const [activeTab, setActiveTab] = useState("about");

  const findChannel = allChannels.find((channel) => channel.id === +channelId);

  const status = useChannelMembers(channelId, "GET_ALL_MEMBER");
  return (
    <section className="absolute  top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-[0_0_1rem_rgba(0,0,0,0.1)] z-10 bg-white w-[55rem] h-[80vh]  rounded-lg">
      <i
        className="fa-solid fa-xmark absolute top-12 right-12 text-4xl cursor-pointer"
        onClick={() => handleModal("isOpenAddUserChannel", false)}
      ></i>
      <div className="px-12 pt-12">
        <p className="text-4xl font-bold flex item-center gap-2 mb-6 ">
          {" "}
          <span>
            <i className="fa-solid fa-hashtag"></i>
          </span>
          <span>{findChannel?.name}</span>
        </p>
      </div>

      <ul className="flex items-center gap-12 px-12  text-2xl border-b-[1px] border-slate-300 ">
        <li
          onClick={() => setActiveTab("about")}
          className={`cursor-pointer py-4 ${
            activeTab === "about" ? "active__tab" : ""
          }`}
        >
          About
        </li>
        <li
          onClick={() => setActiveTab("member")}
          className={`cursor-pointer py-4 ${
            activeTab === "member" ? " active__tab" : ""
          }`}
        >
          Member {numbersOfUser}
        </li>
      </ul>
      {activeTab === "about" && <ChannelAbout />}
      {activeTab === "member" && <Members status={status} />}
    </section>
  );
}
function Members({ status }) {
  return (
    <div className="px-12 pt-8 w-full h-full">
      <SearchMember />
      <AddPeople />
      <div className="channel__member-list flex flex-col gap-4">
        {status === "loading" && <Loading />}
        {status === "error" && <ErrorMessage />}
        {status === "success" && <AllMemberList />}
      </div>
    </div>
  );
}
