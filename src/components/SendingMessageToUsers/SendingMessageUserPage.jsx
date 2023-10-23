import { useEffect, useState } from "react";
import { axiosFetch } from "../../api/api-get";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";
import profileLogo from "../../assets/profilelogo.png";
import { MesageProfilePage } from "./MessageProfilePage";
import { HeaderSendingMessage } from "./HeaderSendingMessage";
import { ChatSendingMessage } from "./ChatSendingMessage";
import { FormChatSendingMessage } from "./FormChatSendingMessage";

export default function SendingMessageUserPage() {
  const { receiverId } = useParams();
  const { dispatch, state } = useAccountContext();
  const { selectedUser, isDirectMessageOpen } = state;
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function getMessage(selectedUser) {
      try {
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

        dispatch({
          type: "SELECTED_USER",
          payload: { ...selectedUser, messages: allMessageData },
        });
        localStorage.setItem(
          "selectedUser",
          JSON.stringify({ ...selectedUser, messages: allMessageData })
        );
        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.log(error);
      }
    }

    getMessage(selectedUser);
  }, [receiverId, dispatch]);

  return (
    <>
      {" "}
      <section className=" relative grid grid-cols-1 grid-rows-[85%,15%] h-screen">
        <HeaderSendingMessage />
        <ChatSendingMessage status={status} />
        <FormChatSendingMessage />
      </section>
      {isDirectMessageOpen && <MesageProfilePage />}
    </>
  );
}
