import { useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";

import { Messages } from "../Messages";
import useMessage from "../../hooks/useMessage";

export const ChannelFeed = () => {
  const { channelId } = useParams();
  const {
    state: { channelMessages, allChannels },

    handleModal,
  } = useAccountContext();
  const status = useMessage(channelId, "FETCH_CHANNEL_MESSAGE", "Channel");

  const findChannel = allChannels.find((channel) => channel.id === +channelId);

  return (
    <div className=" h-full  bg-white   gap-4 text-2xl pl-12 py-6 flex items-end ">
      <div className="direct__message-chat flex flex-col  justify-end  ">
        <div>
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              👋 Welcome to the <i className="fa-solid fa-hashtag"></i>{" "}
              {findChannel?.name} channel
            </h1>
            <p className="text-gray-600 mb-6">
              This channel is for everything{" "}
              <i className="fa-solid fa-hashtag"></i> {findChannel?.name}. Hold
              meetings, share docs, and make decisions together with your team.
            </p>
            <button
              className="py-2 px-6 border border-slate-400 rounded-md"
              onClick={() => handleModal("isOpenAddUserForm", true)}
            >
              {" "}
              <i className="fa-solid fa-user-plus text-2xl  "></i>
              <span className="ml-2">Add coworker</span>
            </button>
          </div>
          <Messages status={status} messageList={channelMessages} url="" />
        </div>
      </div>
    </div>
  );
};
