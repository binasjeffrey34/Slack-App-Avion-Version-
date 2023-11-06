import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccountContext } from "../Context/AccountContext";
import axios from "axios";
import { API_URL } from "../constant/apiUrl";
import { ViewPassWord } from "../components/ViewPassWord";
import { InputElement } from "../components/InputElement";
import { InputError } from "../components/InputError";
import siginLogo from "../assets/signInLogo.jpg";

function CreateAccount() {
  const [isOpenPass1, setIsOpenPass1] = useState(false);
  const [isOpenPass2, setIsOpenPass2] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch, validateInput } = useAccountContext();
  const {
    emailSignUpInput,
    password1,
    password2,
    emailSignUpInputError,
    isemailSignUpInputError,
    password1Error,
    ispassword1Error,
    password2Error,
    ispassword2Error,
    validError,
    isvalidError,
  } = state;

  const newUser = {
    email: emailSignUpInput,
    password: password1,
    password_confirmation: password2,
  };

  function invalidInput(message) {
    dispatch({
      type: "INVALID_INPUT",
      payload: message[0],
    });
  }
  async function handleCreateAccount(e) {
    e.preventDefault();
    try {
      const fields = ["emailSignUpInput", "password1", "password2"];
      for (const field of fields) {
        switch (field) {
          case "emailSignUpInput":
            validateInput(state[field], "Email can't be empty");
            break;
          case "password1":
          case "password2":
            validateInput(state[field], "Password can't be empty");
            break;
          default:
            throw new Error("field not found");
        }
      }

      await axios.post(`${API_URL}/auth`, newUser);
      dispatch({ type: "CREATE_ACCOUNT" });
      navigate("/sign_in");
    } catch (error) {
      const { full_messages } = error.response.data.errors;
      if (password1 !== password2) {
        invalidInput(full_messages[0]);
        return;
      }
      if (password1.length < 6 || password2.length < 6) {
        invalidInput(full_messages[0]);
        return;
      }
      invalidInput(full_messages[0]);
    }
  }

  return (
    <div className="flex items-center justify-center h-[75vh]">
      <section className="flex flex-col gap-6  w-[clamp(30rem,90%,40rem)] shadow-[0_0_10px_rgba(0,0,0,0.15)] pb-16 pt-8 px-12 rounded-md bg-white">
        <img src={siginLogo} alt="" className=" w-48 md:w-60 mx-auto" />
        <form
          className=" flex gap-8 flex-col relative"
          onSubmit={handleCreateAccount}
        >
          <div className="relative">
            <InputElement
              type="email"
              field="emailSignUpInput"
              isError={isemailSignUpInputError}
              holderInfo="E-mail Address"
            />

            {isemailSignUpInputError && (
              <InputError>{emailSignUpInputError}</InputError>
            )}
          </div>
          <div className="relative">
            <InputElement
              type={isOpenPass1 ? "text" : "password"}
              field="password1"
              isError={ispassword1Error}
              holderInfo="Create Password"
            />

            <ViewPassWord onSetOpen={setIsOpenPass1} isOpen={isOpenPass1} />

            {ispassword1Error && <InputError>{password1Error}</InputError>}
          </div>
          <div className="relative">
            <InputElement
              type={isOpenPass2 ? "text" : "password"}
              field="password2"
              isError={ispassword2Error}
              holderInfo="Confirm Password"
            />
            <ViewPassWord onSetOpen={setIsOpenPass2} isOpen={isOpenPass2} />

            {ispassword2Error && <InputError>{password2Error}</InputError>}
          </div>
          {isvalidError && <InputError btmSize="4rem">{validError}</InputError>}
          <button className="w-full text-xl bg-fuchsia-950  font-bold uppercase text-white py-4 rounded-md">
            Sign Up
          </button>
          <div
            className="flex gap-4 flex-col text-center 
          "
          >
            <p className=" text-xl md:text-2xl font-medium">
              Already have account?{" "}
              <Link to="/sign_in" className="text-blue-700 ml-2">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CreateAccount;
