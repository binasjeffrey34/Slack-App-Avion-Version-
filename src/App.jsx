import { Route, Routes } from "react-router-dom";
import { LogInPage } from "./pages/LogInPage";
import { MainPage } from "./pages/Dashboard";
import CreateAccount from "./pages/CreateAccount";
import { ChatPage } from "./components/ChatPage";

import { ChannelProfilePage } from "./components/ChannelProfilePage";
import { MesageProfilePage } from "./components/SendingMessageToUsers/MessageProfilePage";
import { useAccountContext } from "./Context/AccountContext";
import { FormCreatingChannel } from "./components/Forms/FormCreatingChannel";
import { FormCreatingWorkSpace } from "./components/Forms/FormCreatingWorkSpace";
import SendingMessageUserPage from "./components/SendingMessageToUsers/SendingMessageUserPage";

export default function App() {
  const {
    state: { isloggedIn },
  } = useAccountContext();
  return (
    <div>
      <Routes>
        {!isloggedIn ? (
          <>
            <Route path="/" element={<LogInPage />} />
            <Route path="createAccount" element={<CreateAccount />} />
          </>
        ) : (
          <>
            <Route path="workSpace" element={<FormCreatingWorkSpace />} />
            <Route path="createChannel" element={<FormCreatingChannel />} />
            <Route path="dashboard" element={<MainPage />}>
              <Route path=":channelId" element={<ChatPage />}>
                <Route path=":userId" element={<ChannelProfilePage />} />
              </Route>
              <Route
                path="directMessage/:receiverId"
                element={<SendingMessageUserPage />}
              >
                {" "}
                <Route path="profile" element={<MesageProfilePage />} />
              </Route>
            </Route>
          </>
        )}
        <Route path="/" element={<LogInPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

function PageNotFound() {
  return <p>Page not Found</p>;
}
