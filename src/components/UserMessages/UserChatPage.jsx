import { useAccountContext } from "../../Context/AccountContext";
import { MesageProfilePage } from "./MessageProfilePage";
import { HeaderUserPage } from "./HeaderUserPage";
import { UserFeed } from "./UserFeed";
import { SendMessageToUsers } from "./SendMessageToUsers";
import { EmojiModal } from "../EmojiModal";

export default function UserChatPage() {
  const { state } = useAccountContext();
  const { isDirectMessageOpen, ismessageUserInput } = state;

  return (
    <>
      <section className=" relative grid grid-cols-1 grid-rows-[85%,15%] h-screen">
        <HeaderUserPage />
        <UserFeed />
        <SendMessageToUsers />
        {ismessageUserInput && <EmojiModal inputEl="messageUserInput" />}
      </section>

      {isDirectMessageOpen && <MesageProfilePage />}
    </>
  );
}
