import { useAccountContext } from "../../Context/AccountContext";
import { axiosFetch } from "../../api/api-get";

import { useEffect, useState } from "react";
import { AllMemberList } from "./AllMemberList";
import { SearchMember } from "../SearchMember";
import { AddPeople } from "./AddPeople";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";

export function AddUserChannel() {
  const { state, dispatch } = useAccountContext();
  const [status, setStatus] = useState("loading");
  const { allUsers, allChannels } = state;
  const { channelId } = useParams();

  const findChannel = allChannels.find((channel) => channel.id === +channelId);

  useEffect(() => {
    async function getChannelDetails() {
      try {
        const res = await axiosFetch.get(`/channels/${channelId}`);

        const allMember = res.data?.data?.channel_members;

        const getallMember = allUsers.filter((user) =>
          allMember.some((userchannel) => user.id === userchannel.user_id)
        );

        dispatch({
          type: "GET_USERS_CHANNEL",
          payload: getallMember,
        });
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    }

    getChannelDetails();
  }, [dispatch, allUsers, channelId]);

  return (
    <section className="absolute  top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-[0_0_1rem_rgba(0,0,0,0.1)] z-10 bg-white w-[55rem] h-[80vh] px-12 py-20 rounded-lg">
      <i
        className="fa-solid fa-xmark absolute top-4 right-6 text-2xl cursor-pointer"
        onClick={() => {
          dispatch({
            type: "SHOW_MODAL",
            payload: { name: "isOpenAddUserChannel", value: false },
          });
        }}
      ></i>
      <p className="text-4xl font-bold flex item-center gap-2 mb-6 ">
        {" "}
        <span>
          <i className="fa-solid fa-hashtag"></i>
        </span>
        <span>{findChannel?.name}</span>
      </p>
      <SearchMember />
      <AddPeople />
      <div className="channel__member-list flex flex-col gap-4">
        {status === "loading" && <Loading size={"text-2xl"} />}
        {status === "error" && <ErrorMessage />}
        {status === "success" && <AllMemberList />}
      </div>
    </section>
  );
}
