import { useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import { initialStateLogIn, logInReducer } from "./reducer/logInReducer";
import { LogInPage } from "./pages/LogInPage";
import { MainPage } from "./pages/MainPage";
import CreateAccount from "./pages/CreateAccount";

export default function App() {
  const [stateLogIn, dispatchLogIn] = useReducer(
    logInReducer,
    initialStateLogIn
  );

  function handleInput(e) {
    const { name, value } = e.target;

    dispatchLogIn({ type: "SET_INPUT", payload: { name, value } });
  }

  function validateInput(field, message) {
    dispatchLogIn({ type: "VALIDATE_INPUT", payload: { field, message } });
  }

  const checkError = (error) =>
    error ? "border-1 border-rose-500" : "border-[1px_solid_rgba(0,0,0,0.1)]";

  const getAccountLogIn = stateLogIn.accountList.find(
    (acc) =>
      acc.email === stateLogIn.emailInput &&
      acc.password === stateLogIn.passwordInput
  );

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <LogInPage
              state={stateLogIn}
              dispatch={dispatchLogIn}
              onSetInput={handleInput}
              validateInput={validateInput}
              checkError={checkError}
            />
          }
        />
        <Route
          path="createAccount"
          element={
            <CreateAccount
              state={stateLogIn}
              dispatch={dispatchLogIn}
              onSetInput={handleInput}
              validateInput={validateInput}
              checkError={checkError}
            />
          }
        />
        <Route
          path="mainPage"
          element={<MainPage account={getAccountLogIn} />}
        ></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

function PageNotFound() {
  return <p>Page not Found</p>;
}
