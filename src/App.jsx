import { Route, Routes } from "react-router-dom";
import { LogInPage } from "./pages/LogInPage";
import { MainPage } from "./pages/MainPage";
import CreateAccount from "./pages/CreateAccount";
import { ChatPage } from "./components/ChatPage";

import { ProfilePage } from "./pages/ProfilePage";

export default function App() {
  return (
    <div>
      <Routes>
        {/* {!state.isloggedIn ? ( */}
        <>
          <Route path="/" element={<LogInPage />} />
          <Route path="createAccount" element={<CreateAccount />} />
        </>
        {/* ) : ( */}
        <>
          <Route path="mainPage" element={<MainPage />}>
            <Route path=":channelName" element={<ChatPage />}></Route>
            <Route path=":userId" element={<ProfilePage />} />
          </Route>
        </>
        {/* )} */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

function PageNotFound() {
  return <p>Page not Found</p>;
}
