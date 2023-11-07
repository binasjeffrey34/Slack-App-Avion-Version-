import { useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";

import { axiosFetch } from "../../api/api-get";
import { useServices } from "../../services/useServices";

export default function SendMessageToChannel() {
  const { channelId } = useParams();
  const {
    dispatch,
    onSetInput,
    state: { messageChannelInput, allChannels, allUsers },
  } = useAccountContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = {
        receiver_id: channelId,
        receiver_class: "Channel",
        body: messageChannelInput,
      };
      await axiosFetch.post(`/messages`, message);

      dispatch({
        type: "MESSAGE_TO_CHANNELS",
      });

      const messageData = await useServices.getMessages(
        allUsers,
        channelId,
        "Channel"
      );
      dispatch({ type: "FETCH_CHANNEL_MESSAGE", payload: messageData });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const findChannel = allChannels.find((channel) => channel.id === +channelId);

  return (
    <div className="bg-white  h-full">
      <form
        className="w-[95%]  mx-auto bg-white shadow-[0_0_1rem_rgba(0,0,0,0.2)] p-8 rounded-lg relative bottom-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="messageChannelInput"
          placeholder={`Message to ${findChannel?.name}`}
          className="w-full border-[1px] text-xl p-4 rounded-md mb-4"
          value={messageChannelInput}
          onChange={onSetInput}
        />
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-400 text-white text-xl py-2 px-12 rounded-sm"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
