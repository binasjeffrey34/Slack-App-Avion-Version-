import { useEffect, useState } from "react";
import { useAccountContext } from "../../Context/AccountContext";
import { axiosFetch } from "../../api/api-get";
import { useParams } from "react-router-dom";
import { ChannelProfilePage } from "../ChannelProfilePage";
import SendMessageToChannel from "./SendMessageToChannel";
import { ChannelFeed } from "./ChannelFeed";
import { HeaderChatPage } from "./HeaderChatPage";

export function ChatPage() {
  const { channelId } = useParams();
  const [status, setStatus] = useState("loading");
  const {
    dispatch,
    state: { isProfileOpen },
  } = useAccountContext();
  useEffect(() => {
    async function getChannelDetails() {
      try {
        const res = await axiosFetch.get(`/channels/${channelId}`);

        setStatus("success");
        dispatch({
          type: "NUMBER_OF_USERS",
          payload: res.data.data.channel_members.length,
        });
      } catch (error) {
        setStatus("error");
        console.log(error);
      }
    }

    getChannelDetails();
  }, [channelId, dispatch]);

  return (
    <>
      <section className="relative grid grid-cols-1 grid-rows-[85%,15%] h-screen">
        <HeaderChatPage status={status} />
        <ChannelFeed />
        <SendMessageToChannel />
      </section>
      {isProfileOpen && <ChannelProfilePage channelId={channelId} />}
    </>
  );
}
