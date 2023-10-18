import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccountContext } from "../Context/AccountContext";
import axios from "axios";
import { API_URL } from "../constant/apiUrl";

function CreateAccount() {
  const [isOpenPass1, setIsOpenPass1] = useState(false);
  const [isOpenPass2, setIsOpenPass2] = useState(false);
  const navigate = useNavigate();
  const { state, onSetInput } = useAccountContext();
  const { fullNameInput, emailSignUpInput, password1, password2 } = state;

  const newUser = {
    email: emailSignUpInput,
    password: password1,
    password_confirmation: password2,
  };

  async function handleCreateAccount(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/v1/auth`, newUser);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
              className={`border p-4 rounded-sm text-xl w-full `}
              placeholder="Full Name"
              value={fullNameInput}
              onChange={onSetInput}
            />
          </div>
          <div className="relative">
            <input
              type="email"
              name="emailSignUpInput"
              className={`border p-4 rounded-sm text-xl w-full `}
              placeholder="example@gmail.com"
              value={emailSignUpInput}
              onChange={onSetInput}
            />
          </div>
          <div className="relative">
            <input
              type={isOpenPass1 ? "text" : "password"}
              name="password1"
              className={`border p-4 rounded-sm text-xl w-full `}
              placeholder="Password"
              value={password1}
              onChange={onSetInput}
            />
            <i
              onClick={() => setIsOpenPass1((open) => !open)}
              className={`text-gray-400 hover:cursor-pointer absolute right-10 top-1/2 translate-x-[-50%] translate-y-[-50%] text-xl ${
                isOpenPass1 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }`}
            ></i>
          </div>
          <div className="relative">
            <input
              type={isOpenPass2 ? "text" : "password"}
              name="password2"
              className={`border p-4 rounded-sm text-xl w-full `}
              placeholder="Re enter Password"
              value={password2}
              onChange={onSetInput}
            />
            <i
              onClick={() => setIsOpenPass2((open) => !open)}
              className={`text-gray-400 hover:cursor-pointer absolute right-10 top-1/2 translate-x-[-50%] translate-y-[-50%] text-xl ${
                isOpenPass2 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }`}
            ></i>
          </div>

          <button className="w-full text-xl bg-blue-600 font-bold uppercase text-white py-4 rounded-md">
            Create Account
          </button>
        </form>
      </section>
    </div>
  );
}

export default CreateAccount;
