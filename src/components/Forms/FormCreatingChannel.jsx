import { useEffect, useRef } from "react";
import { useAccountContext } from "../../Context/AccountContext";
import { axiosFetch } from "../../api/api-get";
import { useNavigate } from "react-router-dom";
import profileLogo from "../../assets/profilelogo.png";
import { InputError } from "../InputError";
import { InputElement } from "../InputElement";

export function FormCreatingChannel() {
  const {
    state,
    onSetInput,
    dispatch,
    validateInput,
    inputStyle,
    handleModal,
  } = useAccountContext();
  const inputRef = useRef();
  const {
    channelName,
    userId,
    isuserIdError,
    userIdError,
    channelNameError,
    ischannelNameError,
    validError,
    isvalidError,
    allUsers,
  } = state;
  const navigate = useNavigate();
  const checkIncluded = allUsers.map((user) => user.id).includes(+userId);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    async function getAllUsersChannel() {
      try {
        const res = await axiosFetch.get(`/users`);

        const allUsersData = res.data.data.map((user) => ({
          ...user,
          name: user.email.split("@")[0],
          image: profileLogo,
          messages: [],
        }));
        dispatch({ type: "GET_ALL_USERS", payload: allUsersData });
        localStorage.setItem("allUsers", JSON.stringify(allUsersData));
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsersChannel();
  }, [dispatch]);

  async function handleCreateChannel(e) {
    e.preventDefault();
    try {
      const fields = ["channelName", "userId"];
      for (const field of fields) {
        switch (field) {
          case "channelName":
            validateInput(state[field], "Channel Name can't be empty");
            break;
          case "userId":
            validateInput(state[field], "User Id can't be empty");
            break;
          default:
            throw new Error("field not found");
        }
      }
      if (!checkIncluded) {
        dispatch({
          type: "INVALID_INPUT",
          payload: "User does not exist.",
        });
        return;
      }
      const res = await axiosFetch.post(`/channels`, {
        name: channelName,
        user_ids: [+userId],
      });
      console.log(res);

      navigate(`/dashboard/${res.data.data.id}`);
      handleModal("isOpenChannelForm", false);
      dispatch({ type: "CREATE_CHANNEL" });

      //UPDATE DISPLAYING CHANNELS
      const updatedRes = await axiosFetch.get(`/channels`);
      const updatedChannels = updatedRes.data.data;
      dispatch({ type: "GET_ALL_CHANNELS", payload: updatedChannels });
    } catch (error) {
      console.log(error.data.errors);
      // throw new Error(error);
    }
  }

  return (
    <>
      <form
        className="absolute top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%] z-10 shadow-[0_0_1rem_rgba(0,0,0,0.3)]  w-[40rem]  justify-center flex flex-col gap-8 mx-auto bg-white px-12 pt-16 pb-12 rounded-md"
        onSubmit={handleCreateChannel}
      >
        <i
          className="fa-solid fa-xmark absolute top-6 right-10 text-3xl cursor-pointer"
          onClick={() => handleModal("isOpenChannelForm", false)}
        ></i>
        <h1 className="text-4xl font-bold mb-4">Create a Channel</h1>
        <div className="relative w-full">
          <input
            type="text"
            ref={inputRef}
            name="channelName"
            className={inputStyle(ischannelNameError)}
            placeholder="Create a new channel"
            value={channelName}
            onChange={onSetInput}
          />
          {ischannelNameError && <InputError>{channelNameError}</InputError>}
        </div>
        <div className="relative w-full">
          <InputElement
            type="number"
            field="userId"
            isError={isuserIdError}
            holderInfo="User ID"
          />
          {isuserIdError && <InputError>{userIdError}</InputError>}
        </div>
        {isvalidError && (
          <InputError btmSize="7rem" lftSize="3rem">
            {validError}
          </InputError>
        )}
        <div>
          <button className="bg-blue-500 text-white text-xl py-4 px-6 rounded-md">
            Create Channel
          </button>
        </div>
      </form>
    </>
  );
}
