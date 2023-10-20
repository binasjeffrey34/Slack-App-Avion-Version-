import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccountContext } from "../Context/AccountContext";
import axios from "axios";
import { API_URL } from "../constant/apiUrl";
import { axiosFetch } from "../api/api-get";

export function LogInPage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { dispatch, state, onSetInput } = useAccountContext();
  const { emailInput, passwordInput } = state;

  async function handleLogIn(e) {
    e.preventDefault();
    try {
      const userAccount = {
        email: emailInput,
        password: passwordInput,
      };
      const res = await axios.post(
        `${API_URL}/api/v1/auth/sign_in`,
        userAccount
      );
      const {
        headers,
        data: { data },
      } = res;
      const accountData = { ...data, name: data.email.split("@")[0] };
      if (res.status === 200) {
        localStorage.setItem("headers", JSON.stringify(headers));
        localStorage.setItem("accountLogin", JSON.stringify(accountData));
        dispatch({ type: "LOG_IN_SUCCESS", payload: accountData });
        axiosFetch.defaults.headers = {
          "access-token": headers["access-token"],
          client: headers.client,
          expiry: headers.expiry,
          uid: headers.uid,
        };

        const channelsRes = await axiosFetch.get(`/api/v1/channels`);
        const allChannels = channelsRes?.data?.data;

        if (allChannels?.length > 0) {
          const firstChannelId = allChannels[0]?.id;
          navigate(`/dashboard/${firstChannelId}`);
        } else {
          dispatch({
            type: "SHOW_MODAL",
            payload: { name: "isOpenWorkSpace", value: true },
          });
          navigate("workSpace");
        }
      }
    } catch (error) {
      console.log(...error.response.data.errors);
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
              className={`border p-4 rounded-sm text-xl w-full`}
              placeholder="example@gmail.com"
              onChange={onSetInput}
            />
          </div>

          <div className="relative">
            <input
              type={isOpen ? "text" : "password"}
              name="passwordInput"
              value={passwordInput}
              className={`border p-4 rounded-sm text-xl w-full`}
              placeholder="Password"
              onChange={onSetInput}
            />
            <i
              onClick={() => setIsOpen((open) => !open)}
              className={`text-gray-400 hover:cursor-pointer absolute right-10 top-1/2 translate-x-[-50%] translate-y-[-50%] text-xl ${
                isOpen ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }`}
            ></i>
          </div>

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
