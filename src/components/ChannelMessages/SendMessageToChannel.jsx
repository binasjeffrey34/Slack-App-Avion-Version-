import { useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";

import { axiosFetch } from "../../api/api-get";
import profileLogo from "../../assets/profilelogo.png";

export default function SendMessageToChannel() {
  const { channelId } = useParams();
  const {
    dispatch,
    onSetInput,
    state: { messageChannelInput },
  } = useAccountContext();

  const sendMessageToChannel = async () => {
    try {
      await axiosFetch.post(`/messages`, {
        receiver_id: channelId,
        receiver_class: "Channel",
        body: messageChannelInput,
      });

      dispatch({
        type: "MESSAGE_TO_CHANNELS",
      });

      const updateRes = await axiosFetch.get(
        `/messages?receiver_id=${channelId}&receiver_class=Channel`
      );

      const senderData = updateRes.data.data;
      const senderAPIdata = senderData.map((msg) => ({
        ...msg,
        sender: {
          ...msg.sender,
          image: profileLogo,
          name: msg.sender.email.split("@")[0],
        },
      }));

      dispatch({ type: "FETCH_CHANNEL_MESSAGE", payload: senderAPIdata });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageToChannel();
  };

  return (
    <div className="bg-white  h-full">
      <form
        className="w-[95%]  mx-auto bg-white shadow-[0_0_1rem_rgba(0,0,0,0.2)] p-8 rounded-lg relative bottom-20"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="messageChannelInput"
          placeholder={`Message to ChannelName`}
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
