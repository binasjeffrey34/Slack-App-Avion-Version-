import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccountContext } from "../Context/AccountContext";

export function LogInPage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { dispatch, state, onSetInput, validateInput, checkError } =
    useAccountContext();
  const {
    accountList,
    emailInput,
    passwordInput,
    emailInputError,
    passwordInputError,
    isemailInputError,
    ispasswordInputError,
    isvalidError,
    validError,
  } = state;

  function handleLogIn(e) {
    e.preventDefault();
    const checkIfExist = accountList.some(
      (acc) => acc.email === emailInput && acc.password === passwordInput
    );
    const fields = ["emailInput", "passwordInput"];

    for (const field of fields) {
      if (!state[field]) {
        validateInput(field, "Can't be Empty");
        return;
      }
    }

    if (checkIfExist) {
      const getAccountLogIn =
        state.accountList.find(
          (acc) =>
            acc.email === state.emailInput &&
            acc.password === state.passwordInput
        ) || null;
      dispatch({ type: "LOGIN_SUCCESSFUL", payload: getAccountLogIn });
      navigate("/mainPage");
    } else {
      dispatch({
        type: "LOGIN_INVALID",
        payload: "Invalid email or password",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="flex flex-col gap-6  w-[40rem] shadow-[0_0_10px_rgba(0,0,0,0.1)] py-20 px-12 rounded-mds bg-white">
        <h1 className="text-center text-5xl font-bold tracking-[1px]">
          Sign In to Slack
        </h1>
        <form
          method="POST"
          className=" flex gap-8 flex-col relative"
          onSubmit={handleLogIn}
        >
          <div className="relative">
            <input
              type="email"
              name="emailInput"
              value={emailInput}
              className={`border p-4 rounded-sm text-xl w-full ${checkError(
                isemailInputError
              )}`}
              placeholder="example@gmail.com"
              onChange={onSetInput}
            />
            {isemailInputError && (
              <small className="text-lg text-red-500 absolute top-16 left-0 z-10">
                {emailInputError}
              </small>
            )}
          </div>

          <div className="relative">
            <input
              type={isOpen ? "text" : "password"}
              name="passwordInput"
              value={passwordInput}
              className={`border p-4 rounded-sm text-xl w-full ${checkError(
                ispasswordInputError
              )}`}
              placeholder="Password"
              onChange={onSetInput}
            />
            <i
              onClick={() => setIsOpen((open) => !open)}
              className={`text-gray-400 hover:cursor-pointer absolute right-10 top-1/2 translate-x-[-50%] translate-y-[-50%] text-xl ${
                isOpen ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }`}
            ></i>
            {ispasswordInputError && (
              <small className="text-lg text-red-500 absolute top-16 left-0 z-10">
                {passwordInputError}
              </small>
            )}
          </div>
          {isvalidError && (
            <small className="text-lg text-red-500 absolute top-40 left-0 z-10">
              {validError}
            </small>
          )}
          <button className="w-full text-xl bg-blue-600 font-bold uppercase text-white py-4 rounded-md">
            Log In
          </button>
        </form>
        <p className="text-center text-2xl">
          Dont have Account?
          <span>
            <Link
              to="/createAccount"
              className="text-blue-600 underline ml-2 tracking-[1px] font-medium"
            >
              SignUp
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
}
