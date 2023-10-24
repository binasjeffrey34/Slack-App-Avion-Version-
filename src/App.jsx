import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogInPage } from "./pages/LogInPage";
import { Dashboard } from "./pages/Dashboard";
import CreateAccount from "./pages/CreateAccount";
import { ChatPage } from "./components/ChannelMessages/ChatPage";
import { ChannelProfilePage } from "./components/ChannelProfilePage";
import { MesageProfilePage } from "./components/UserMessages/MessageProfilePage";
import { FormCreatingChannel } from "./components/Forms/FormCreatingChannel";
import { FormCreatingWorkSpace } from "./components/Forms/FormCreatingWorkSpace";
import MessageUserFeed from "./components/UserMessages/MessageUserFeed";
import { AccountProvider } from "./Context/AccountContext";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInPage />} />
          <Route path="createAccount" element={<CreateAccount />} />
          <Route path="workSpace" element={<FormCreatingWorkSpace />} />
          <Route path="createChannel" element={<FormCreatingChannel />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path=":channelId" element={<ChatPage />}>
              <Route path=":userId" element={<ChannelProfilePage />} />
            </Route>
            <Route
              path="directMessage/:receiverId"
              element={<MessageUserFeed />}
            >
              <Route path="profile" element={<MesageProfilePage />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AccountProvider>
  );
}

function PageNotFound() {
  return (
    <p className="h-screen grid place-items-center text-4xl font-bold">
      Page not Found !
    </p>
  );
}
