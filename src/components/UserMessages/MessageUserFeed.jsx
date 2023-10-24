import { useEffect, useState } from "react";
import { axiosFetch } from "../../api/api-get";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";
import profileLogo from "../../assets/profilelogo.png";
import { MesageProfilePage } from "./MessageProfilePage";
import { HeaderSendingMessage } from "./HeaderSendingMessage";
import { ChatSendingMessage } from "./ChatSendingMessage";
import { SendMessageToUsers } from "./SendMessageToUsers";

export default function MessageUserFeed() {
  const { receiverId } = useParams();
  const { dispatch, state } = useAccountContext();
  const { isDirectMessageOpen } = state;
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function getMessage() {
      try {
        const res = await axiosFetch.get(
          `/messages?receiver_id=${receiverId}&receiver_class=User`
        );
        const { data } = res.data;

        const userMessages = data.map((msg) => ({
          ...msg,
          sender: {
            ...msg.sender,
            image: profileLogo,
            name: msg.sender.email.split("@")[0],
          },
        }));

        dispatch({
          type: "FETCH_USERS_MESSAGE",
          payload: userMessages,
        });
        localStorage.setItem("userMessages", JSON.stringify(userMessages));
        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.log(error);
      }
    }

    getMessage();
  }, [receiverId, dispatch]);

  return (
    <>
      <section className=" relative grid grid-cols-1 grid-rows-[85%,15%] h-screen">
        <HeaderSendingMessage />
        <ChatSendingMessage status={status} />
        <SendMessageToUsers />
      </section>
      {isDirectMessageOpen && <MesageProfilePage />}
    </>
  );
}
