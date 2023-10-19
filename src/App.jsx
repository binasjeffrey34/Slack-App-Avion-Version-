import { Route, Routes } from "react-router-dom";
import { LogInPage } from "./pages/LogInPage";
import { MainPage } from "./pages/MainPage";
import CreateAccount from "./pages/CreateAccount";
import { ChatPage } from "./components/ChatPage";

import { ProfilePage } from "./pages/ProfilePage";
import { useAccountContext } from "./Context/AccountContext";
import { FormCreatingChannel } from "./components/FormCreatingChannel";
import { FormCreatingWorkSpace } from "./components/FormCreatingWorkSpace";

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
                <Route path=":userId" element={<ProfilePage />} />
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
