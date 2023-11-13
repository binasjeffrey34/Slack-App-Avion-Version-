import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogInPage } from "./pages/LogInPage";
import { Dashboard } from "./pages/Dashboard";
import CreateAccount from "./pages/CreateAccount";
import { ChannelChatPage } from "./components/ChannelMessages/ChannelChatPage";
import { ChannelProfilePage } from "./components/ChannelMessages/ChannelProfilePage";
import { MesageProfilePage } from "./components/UserMessages/MessageProfilePage";
import { FormCreatingChannel } from "./components/Forms/FormCreatingChannel";
import { FormCreatingWorkSpace } from "./components/Forms/FormCreatingWorkSpace";
import UserChatPage from "./components/UserMessages/UserChatPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { Home } from "./pages/Home";
import { PageNotFound } from "./pages/PageNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path="sign_in" element={<LogInPage />} />
          <Route path="create_account" element={<CreateAccount />} />
        </Route>

        <Route path="work_space" element={<FormCreatingWorkSpace />} />
        <Route path="create_channel" element={<FormCreatingChannel />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path=":channelId" element={<ChannelChatPage />}>
            <Route path=":userId" element={<ChannelProfilePage />} />
          </Route>
          <Route
            path="direct_message/:channelId/:receiverId"
            element={<UserChatPage />}
          >
            <Route path="profile" element={<MesageProfilePage />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
