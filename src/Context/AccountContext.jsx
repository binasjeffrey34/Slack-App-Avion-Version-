import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducer/reducer";
import { initialState } from "../reducer/initialState";

const AccountContext = createContext();

function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleInput(e) {
    const { name, value } = e.target;

    dispatch({ type: "SET_INPUT", payload: { name, value } });
  }

  function validateInput(field, message) {
    dispatch({ type: "VALIDATE_INPUT", payload: { field, message } });
  }

  const checkError = (error) =>
    error ? "border-1 border-rose-500" : "border-[1px_solid_rgba(0,0,0,0.1)]";

  return (
    <AccountContext.Provider
      value={{
        state,
        dispatch,
        onSetInput: handleInput,
        validateInput,
        checkError,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

function useAccountContext() {
  const context = useContext(AccountContext);
  if (context === undefined) throw new Error("context is outside the Provider");
  return context;
}

export { AccountProvider, useAccountContext };
