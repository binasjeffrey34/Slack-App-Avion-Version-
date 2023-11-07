import { useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";
// import profileLogo from "../../assets/profilelogo.png";
import { MesageProfilePage } from "./MessageProfilePage";
import { HeaderUserPage } from "./HeaderUserPage";
import { UserFeed } from "./UserFeed";
import { SendMessageToUsers } from "./SendMessageToUsers";
import useMessage from "../../hooks/useMessage";

export default function UserChatPage() {
  const { receiverId } = useParams();
  const { state } = useAccountContext();
  const { isDirectMessageOpen } = state;

  const status = useMessage(receiverId, "FETCH_USERS_MESSAGE", "User");

  return (
    <>
      <section className=" relative grid grid-cols-1 grid-rows-[80%,20%] h-screen">
        <HeaderUserPage />
        <UserFeed status={status} />
        <SendMessageToUsers />
      </section>
      {isDirectMessageOpen && <MesageProfilePage />}
    </>
  );
}
