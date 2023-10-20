import { axiosFetch } from "../../api/api-get";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";
import profileLogo from "../../assets/profilelogo.png";

export function FormChatSendingMessage() {
  const {
    state: { messageChannelInput, selectedUser },
    onSetInput,
    dispatch,
  } = useAccountContext();
  const { receiverId } = useParams();

  async function handleDirectMessageToUser(e) {
    e.preventDefault();
    try {
      const message = {
        receiver_id: receiverId,
        receiver_class: "User",
        body: messageChannelInput,
      };

      await axiosFetch.post("/api/v1/messages", message);
      dispatch({ type: "SEND_MESSAGE" });

      const res = await axiosFetch.get(
        `/api/v1/messages?receiver_id=${receiverId}&receiver_class=User`
      );
      const { data } = res.data;
      const allMessageData = data.map((msg) => ({
        ...msg,
        sender: {
          ...msg.sender,
          image: profileLogo,
          name: msg.sender.email.split("@")[0],
        },
        receiver: {
          ...msg.receiver,
          image: profileLogo,
          name: msg.receiver.email.split("@")[0],
        },
      }));
      console.log(allMessageData);
      dispatch({
        type: "SELECTED_USER",
        payload: { ...selectedUser, messages: allMessageData },
      });
      localStorage.setItem(
        "selectedUser",
        JSON.stringify({ ...selectedUser, messages: allMessageData })
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className=" w-full bg-white shadow-[0_0_1rem_rgba(0,0,0,0.1)] p-8"
      onSubmit={handleDirectMessageToUser}
    >
      <input
        type="text"
        name="messageChannelInput"
        placeholder={`Message to ${selectedUser.name}`}
        value={messageChannelInput}
        onChange={onSetInput}
        className="w-full border-[1px] text-xl p-4 rounded-md mb-6"
      />
      <div className="text-right ">
        <button className="bg-blue-400 text-white text-xl py-2 px-10 rounded-sm">
          Send
        </button>
      </div>
    </form>
  );
}
