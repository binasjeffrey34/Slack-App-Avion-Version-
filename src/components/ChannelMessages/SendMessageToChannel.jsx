import { useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";

import { axiosFetch } from "../../api/api-get";
import { useServices } from "../../services/useServices";
import SendMessage from "../SendMessage";

export default function SendMessageToChannel() {
  const { channelId } = useParams();
  const {
    dispatch,
    handleModalEmoji,
    state: { messageChannelInput, allChannels, allUsers },
  } = useAccountContext();
  const message = {
    receiver_id: channelId,
    receiver_class: "Channel",
    body: messageChannelInput,
  };

  const handleMessageToChannel = async (e) => {
    e.preventDefault();
    try {
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
      handleModalEmoji("ismessageChannelInput");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const findChannel = allChannels.find((channel) => channel.id === +channelId);

  return (
    <SendMessage
      onSubmit={handleMessageToChannel}
      name={findChannel?.name}
      inputVal="messageChannelInput"
    />
  );
}
