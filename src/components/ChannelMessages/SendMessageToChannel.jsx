import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";
import { API_URL } from "../../constant/apiUrl";
import { axiosFetch } from "../../api/api-get";
import profileLogo from "../../assets/profilelogo.png";

export default function SendMessageToChannel() {
  const [message, setMessage] = useState("");
  const { channelId } = useParams();
  const { dispatch } = useAccountContext();

  const sendMessageToChannel = async () => {
    try {
      const res = await axiosFetch.post(`${API_URL}/api/v1/messages`, {
        receiver_id: channelId,
        receiver_class: "Channel",
        body: message,
      });
      const data = res.data;
      dispatch({
        type: "MESSAGE_TO_CHANNELS",
        payload: res.data.data,
      });
      localStorage.setItem("MESSAGE_TO_CHANNELS", JSON.stringify(data));
      console.log(data);

      const updateRes = await axiosFetch.get(
        `/api/v1/messages?receiver_id=${channelId}&receiver_class=Channel`
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

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageToChannel();
    setMessage;
    ({ message });
  };

  useEffect(() => {
    sendMessageToChannel();
  }, []);

  return (
    <form
      className="w-full h-full bg-white shadow-[0_0_1rem_rgba(0,0,0,0.1)] p-4 pt-12"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="messageChannelInput"
        placeholder={`Message to ChannelName`}
        className="w-full border-[1px] text-xl p-4 rounded-md mb-2"
        value={message}
        onChange={handleInputChange}
      />
      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-400 text-white text-xl py-2 px-10 rounded-sm"
        >
          Send
        </button>
      </div>
    </form>
  );
}
