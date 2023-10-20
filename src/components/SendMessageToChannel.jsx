import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../Context/AccountContext";
import { API_URL } from "../constant/apiUrl";
import { axiosFetch } from "../api/api-get";

export function SendMessageToChannel() {
  const [message, setMessage] = useState("");
  const { channelId } = useParams();
  const {
    state: { sendMessage },
    dispatch,
  } = useAccountContext();

  console.log(sendMessage);

  const sendMessageToChannel = async () => {
    try {
      const res = await axiosFetch.post(`${API_URL}/api/v1/messages`, {
        receiver_id: channelId,
        receiver_class: "Channel",
        body: message,
      });
      console.log(res);
      dispatch({
        type: "MESSAGE_TO_CHANNELS",
        payload: res.data.data,
      });

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
  };

  return (
    <form
      className="w-full h-full bg-white shadow-[0_0_1rem_rgba(0,0,0,0.1)] p-4 pt-12"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="messageChannelInput"
        placeholder={`Message to channelName`}
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

export default SendMessageToChannel;
