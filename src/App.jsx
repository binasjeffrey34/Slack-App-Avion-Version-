import { Route, Routes } from "react-router-dom";
import { LogInPage } from "./pages/LogInPage";
import { MainPage } from "./pages/MainPage";
import CreateAccount from "./pages/CreateAccount";
import { ChatPage } from "./components/ChatPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="createAccount" element={<CreateAccount />} />
        <Route path="mainPage" element={<MainPage />}>
          <Route path="channel/:name" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

function PageNotFound() {
  return <p>Page not Found</p>;
}
