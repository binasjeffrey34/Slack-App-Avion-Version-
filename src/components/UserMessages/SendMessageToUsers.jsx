import { axiosFetch } from "../../api/api-get";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";
import { useServices } from "../../services/useServices";
import SendMessage from "../SendMessage";
import removeDuplicateMessage from "../../utils/removeDuplicateMessage";

export function SendMessageToUsers() {
  const {
    state: { messageUserInput, selectedUser, allUsers },
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
      const uniqueMessage = removeDuplicateMessage(messageData);
      dispatch({
        type: "FETCH_USERS_MESSAGE",
        payload: uniqueMessage,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SendMessage
      onSubmit={handleDirectMessageToUser}
      name={selectedUser?.name}
      inputVal="messageUserInput"
    />
  );
}
