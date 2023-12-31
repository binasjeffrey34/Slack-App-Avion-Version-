import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccountContext } from "../Context/AccountContext";
import axios from "axios";
import { API_URL } from "../constant/apiUrl";
import { axiosFetch } from "../api/api-get";
import { InputError } from "../components/InputError";
import { InputElement } from "../components/InputElement";
import { ViewPassWord } from "../components/ViewPassWord";
import siginLogo from "../assets/signInLogo.jpg";
import googleLogo from "../assets/googleLogo.webp";

export default function LogInPage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();
  const {
    dispatch,
    state,
    validateInput,
    handleModal,
    onSetInput,
    inputStyle,
  } = useAccountContext();
  const {
    emailInput,
    passwordInput,
    isAuthenticated,
    emailInputError,
    isemailInputError,
    passwordInputError,
    ispasswordInputError,
    isvalidError,
    validError,
  } = state;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    async function login() {
      if (isAuthenticated) {
        const channelsRes = await axiosFetch.get(`channels`);
        const allChannels = channelsRes?.data?.data;

        if (allChannels?.length > 0) {
          const firstChannelId = allChannels[0]?.id;
          navigate(`/dashboard/${firstChannelId}`);
        } else {
          handleModal("isOpenWorkSpace");
          navigate("/work_space");
        }
      }
    }
    login();
  }, [isAuthenticated, navigate, dispatch, handleModal]);

  async function handleLogIn(e) {
    e.preventDefault();
    try {
      const userAccount = {
        email: emailInput,
        password: passwordInput,
      };

      const fields = ["emailInput", "passwordInput"];
      for (const field of fields) {
        switch (field) {
          case "emailInput":
            if (!state[field]) {
              validateInput("emailInput", "Email can't be empty");
              return;
            }
            break;
          case "passwordInput":
            if (!state[field]) {
              validateInput("passwordInput", "Password can't be empty");
              return;
            }
            break;
          default:
            throw new Error("field not found");
        }
      }

      const res = await axios.post(`${API_URL}/auth/sign_in`, userAccount);

      const {
        headers,
        data: { data },
      } = res;
      const accountData = {
        ...data,
        name: data?.email.split("@")[0],
      };
      if (res.status === 200) {
        localStorage.setItem("headers", JSON.stringify(headers));
        localStorage.setItem("accountLogin", JSON.stringify(accountData));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));

        dispatch({ type: "LOG_IN", payload: accountData });
        axiosFetch.defaults.headers = {
          "access-token": headers["access-token"],
          client: headers.client,
          expiry: headers.expiry,
          uid: headers.uid,
        };
      }
    } catch (error) {
      dispatch({
        type: "INVALID_INPUT",
        payload: error.response?.data?.errors[0],
      });
    }
  }

  return (
    <div className="flex items-center justify-center pt-12 md:pt-20 ">
      <section className="flex flex-col gap-6  w-[clamp(30rem,90%,40rem)] shadow-[0_0_10px_rgba(0,0,0,0.15)] pt-8 pb-16 px-12 rounded-md bg-white">
        <img
          src={siginLogo}
          alt="signInLogo"
          className=" w-48 md:w-60 mx-auto"
        />

        <form
          data-testid="loginForm"
          className=" flex gap-8 flex-col relative"
          onSubmit={handleLogIn}
        >
          <div className="relative">
            <input
              type="email"
              ref={inputRef}
              name="emailInput"
              className={inputStyle(isemailInputError)}
              placeholder="E-mail Address"
              value={emailInput}
              onChange={onSetInput}
            />

            {isemailInputError && <InputError>{emailInputError}</InputError>}
          </div>

          <div className="relative">
            <InputElement
              type={isOpen ? "text" : "password"}
              field="passwordInput"
              isError={ispasswordInputError}
              holderInfo="Password"
            />
            <ViewPassWord onSetOpen={setIsOpen} isOpen={isOpen} />
            {ispasswordInputError && (
              <InputError>{passwordInputError}</InputError>
            )}
          </div>

          {isvalidError && <InputError btmSize="4rem">{validError}</InputError>}
          <button className="w-full text-xl bg-fuchsia-950  font-bold uppercase text-white py-4 rounded-md tracking-[1px]">
            Sign In
          </button>
        </form>
        <div className="flex flex-col gap-6 text-center">
          <p className="or_login relative text-center text-gray-700 text-lg font-bold">
            OR
          </p>

          <div className="flex  items-center justify-center gap-8">
            <img src={googleLogo} alt="" className="w-10" />
            <i className="fa-brands fa-square-facebook text-4xl text-blue-700"></i>
            <i className="fa-brands fa-github text-4xl"></i>
          </div>
          <p className=" text-xl md:text-2xl">
            Dont have Account?
            <span>
              <Link
                to="/create_account"
                className="text-blue-600 ml-2  font-medium"
              >
                Create Account
              </Link>
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
