import { axiosFetch } from "../../api/api-get";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";
import { useServices } from "../../services/useServices";

export function SendMessageToUsers() {
  const {
    state: { messageUserInput, selectedUser, allUsers },
    onSetInput,
    dispatch,
  } = useAccountContext();
  const { receiverId } = useParams();
  const message = {
    receiver_id: receiverId,
    receiver_class: "User",
    body: messageUserInput,
  };

  async function handleDirectMessageToUser(e) {
    e.preventDefault();
    try {
      await axiosFetch.post("/messages", message);
      dispatch({ type: "MESSAGE_TO_USERS" });

      const messageData = await useServices.getMessages(
        allUsers,
        receiverId,
        "User"
      );

      dispatch({
        type: "FETCH_USERS_MESSAGE",
        payload: messageData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white  h-full">
      <form
        className=" w-[95%]  mx-auto bg-white shadow-[0_0_1rem_rgba(0,0,0,0.2)] p-8 rounded-lg relative bottom-20"
        onSubmit={handleDirectMessageToUser}
      >
        <input
          type="text"
          name="messageUserInput"
          placeholder={`Message ${selectedUser.name}`}
          value={messageUserInput}
          onChange={onSetInput}
          className="w-full border-[1px] text-[1.4rem] p-4 rounded-md mb-4"
        />

        <div className="text-right ">
          <button className="bg-blue-400 text-white text-xl py-2 px-12 rounded-md">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
