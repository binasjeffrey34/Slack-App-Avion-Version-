import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount({
  state,
  dispatch,
  onSetInput,
  validateInput,
  checkError,
}) {
  const [isOpenPass1, setIsOpenPass1] = useState(false);
  const [isOpenPass2, setIsOpenPass2] = useState(false);
  const navigate = useNavigate();

  const {
    fullNameInput,
    fullNameInputError,
    isfullNameInputError,
    emailSignUpInput,
    password1SignUpInput,
    password2SignUpInput,
    emailSignUpInputError,
    password1SignUpInputError,
    password2SignUpInputError,
    isemailSignUpInputError,
    ispassword1SignUpInputError,
    ispassword2SignUpInputError,
    accountList,
  } = state;

  function handleCreateAccount(e) {
    e.preventDefault();
    const listEmail = accountList.map((acc) => acc.email.toLowerCase());
    const listFullName = accountList.map((acc) => acc.fullName.toLowerCase());

    const fields = [
      "fullNameInput",
      "emailSignUpInput",
      "password1SignUpInput",
      "password2SignUpInput",
    ];
    for (const field of fields) {
      if (!state[field]) {
        validateInput(field, "Can't be Empty");
        return;
      }
      switch (field) {
        case "fullNameInput":
          if (listFullName.includes(state[field].toLowerCase())) {
            validateInput(field, "User already Exist");
            return;
          }
          break;
        case "emailSignUpInput":
          if (listEmail.includes(state[field].toLowerCase())) {
            validateInput(field, "Email already Exist");
            return;
          }
          break;
        case "password2SignUpInput":
          if (password1SignUpInput !== state[field]) {
            validateInput(field, "Passwords do not match");
            return;
          }
      }
    }
    dispatch({ type: "CREATE_ACCOUNT" });
    navigate("/");
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="flex flex-col gap-6  w-[40rem] shadow-[0_0_10px_rgba(0,0,0,0.1)] py-20 px-12 rounded-mds bg-white">
        <h1 className="text-center text-5xl font-bold tracking-[1px]">
          Sign Up to Slack
        </h1>
        <form className=" flex gap-8 flex-col" onSubmit={handleCreateAccount}>
          <div className="relative">
            <input
              type="text"
              name="fullNameInput"
              className={`border p-4 rounded-sm text-xl w-full ${checkError(
                isfullNameInputError
              )}`}
              placeholder="Full Name"
              value={fullNameInput}
              onChange={onSetInput}
            />
            {isfullNameInputError && (
              <small className="text-lg text-red-500 absolute top-[4rem] left-0 z-10">
                {fullNameInputError}
              </small>
            )}
          </div>
          <div className="relative">
            <input
              type="email"
              name="emailSignUpInput"
              className={`border p-4 rounded-sm text-xl w-full ${checkError(
                isemailSignUpInputError
              )}`}
              placeholder="example@gmail.com"
              value={emailSignUpInput}
              onChange={onSetInput}
            />
            {isemailSignUpInputError && (
              <small className="text-lg text-red-500 absolute top-[4rem] left-0 z-10">
                {emailSignUpInputError}
              </small>
            )}
          </div>
          <div className="relative">
            <input
              type={isOpenPass1 ? "text" : "password"}
              name="password1SignUpInput"
              className={`border p-4 rounded-sm text-xl w-full ${checkError(
                ispassword1SignUpInputError
              )}`}
              placeholder="Password"
              value={password1SignUpInput}
              onChange={onSetInput}
            />
            <i
              onClick={() => setIsOpenPass1((open) => !open)}
              className={`text-gray-400 hover:cursor-pointer absolute right-10 top-1/2 translate-x-[-50%] translate-y-[-50%] text-xl ${
                isOpenPass1 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }`}
            ></i>
            {ispassword1SignUpInputError && (
              <small className="text-lg text-red-500 absolute top-[4rem] left-0 z-10">
                {password1SignUpInputError}
              </small>
            )}
          </div>
          <div className="relative">
            <input
              type={isOpenPass2 ? "text" : "password"}
              name="password2SignUpInput"
              className={`border p-4 rounded-sm text-xl w-full ${checkError(
                ispassword2SignUpInputError
              )}`}
              placeholder="Re enter Password"
              value={password2SignUpInput}
              onChange={onSetInput}
            />
            <i
              onClick={() => setIsOpenPass2((open) => !open)}
              className={`text-gray-400 hover:cursor-pointer absolute right-10 top-1/2 translate-x-[-50%] translate-y-[-50%] text-xl ${
                isOpenPass2 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }`}
            ></i>
            {ispassword2SignUpInputError && (
              <small className="text-lg text-red-500 absolute top-[4rem] left-0 z-10">
                {password2SignUpInputError}
              </small>
            )}
          </div>

          <button className="w-full text-xl bg-blue-600 font-bold uppercase text-white py-4 rounded-md">
            Create Account
          </button>
        </form>

        {/* <Link
          to="/"
          className="text-center text-2xl text-blue-600 font-medium tracking-[1px] underline"
        >
          Sig In{" "}
        </Link> */}
      </section>
    </div>
  );
}

export default CreateAccount;
