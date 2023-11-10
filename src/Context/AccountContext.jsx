import { createContext, useCallback, useContext, useReducer } from "react";
import { reducer } from "../stores/reducer";
import { initialState } from "../stores/initialState";

const AccountContext = createContext();

function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleModal = useCallback((name, value) => {
    dispatch({
      type: "SHOW_MODAL",
      payload: { name, value },
    });
  }, []);

  const handleModalEmoji = useCallback((name) => {
    dispatch({
      type: "SHOW_MODAL_EMOJI",
      payload: name,
    });
  }, []);

  function handleGetEmoji(emoji, field) {
    dispatch({
      type: "ADD_EMOJI",
      payload: {
        field,
        value: `${state[field]}${emoji}`,
      },
    });
  }

  function handleInput(e) {
    const { name, value } = e.target;

    dispatch({ type: "SET_INPUT", payload: { name, value } });
  }

  function validateInput(field, message) {
    dispatch({ type: "VALIDATE_INPUT", payload: { field, message } });
  }

  const checkError = (error) =>
    error ? "border-1 border-rose-500" : "border-[1px_solid_rgba(0,0,0,0.1)]";

  const inputStyle = (error) =>
    `border p-4 rounded-sm text-xl w-full ${checkError(error)}`;

  return (
    <AccountContext.Provider
      value={{
        state,
        dispatch,
        onSetInput: handleInput,
        validateInput,
        inputStyle,
        handleModal,
        handleModalEmoji,
        handleGetEmoji,
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
