import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LogInPage = lazy(() => import("./pages/LogInPage"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import { ChannelChatPage } from "./components/ChannelMessages/ChannelChatPage";
import { ChannelProfilePage } from "./components/ChannelMessages/ChannelProfilePage";
import { MesageProfilePage } from "./components/UserMessages/MessageProfilePage";
import { FormCreatingChannel } from "./components/Forms/FormCreatingChannel";
import { FormCreatingWorkSpace } from "./components/Forms/FormCreatingWorkSpace";
import UserChatPage from "./components/UserMessages/UserChatPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
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
      </Suspense>
    </BrowserRouter>
  );
}
