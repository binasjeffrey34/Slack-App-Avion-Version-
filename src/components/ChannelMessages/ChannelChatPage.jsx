import { useAccountContext } from "../../Context/AccountContext";
import { ChannelProfilePage } from "./ChannelProfilePage";
import SendMessageToChannel from "./SendMessageToChannel";
import { ChannelFeed } from "./ChannelFeed";
import { HeaderChannelPage } from "./HeaderChannelPage";

import { EmojiModal } from "../EmojiModal";

export function ChannelChatPage() {
  const {
    state: { isProfileOpen, ismessageChannelInput },
  } = useAccountContext();

  return (
    <>
      <section className="relative grid grid-cols-1 grid-rows-[85%,15%]  h-screen">
        <HeaderChannelPage />
        <ChannelFeed />
        <SendMessageToChannel />
        {ismessageChannelInput && <EmojiModal inputEl="messageChannelInput" />}
      </section>
      {isProfileOpen && <ChannelProfilePage />}
    </>
  );
}
