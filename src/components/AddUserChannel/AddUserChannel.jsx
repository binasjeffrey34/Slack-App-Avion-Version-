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
  const { state, handleModal, dispatch } = useAccountContext();
  const { allChannels, numbersOfUser, activeTab } = state;
  const { channelId } = useParams();

  const findChannel = allChannels.find((channel) => channel.id === +channelId);

  const status = useChannelMembers(channelId, "GET_ALL_MEMBER");

  const handleOpenMemberTab = (active) => {
    // Call handleModal to open the modal and set activeTab to "member".
    handleModal("isOpenAddUserChannel", true);
    dispatch({ type: "SET_ACTIVE_TAB", payload: active });
  };

  return (
    <section className="absolute  top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-[0_0_1rem_rgba(0,0,0,0.1)] z-10 bg-white w-[55rem] h-[80vh]  rounded-lg">
      <i
        className="fa-solid fa-xmark absolute top-4 right-6 text-2xl cursor-pointer"
        onClick={() => handleModal("isOpenAddUserChannel", false)}
      ></i>
      <div className="px-12 pt-20">
        <p className="text-4xl font-bold flex item-center gap-2 mb-6 ">
          {" "}
          <span>
            <i className="fa-solid fa-hashtag"></i>
          </span>
          <span>{findChannel?.name}</span>
        </p>
      </div>

      <ul className="flex items-center gap-12 px-12 py-4 text-2xl border-b-[1px] border-slate-300 ">
        <li
          onClick={() => handleOpenMemberTab("about")}
          className="cursor-pointer"
        >
          About
        </li>
        <li
          onClick={() => handleOpenMemberTab("member")}
          className="cursor-pointer"
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
    <div className="px-12 pt-8">
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
