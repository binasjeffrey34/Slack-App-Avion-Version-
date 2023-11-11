import { useEffect, useRef } from "react";
import { useAccountContext } from "../../Context/AccountContext";
import { axiosFetch } from "../../api/api-get";
import { useNavigate } from "react-router-dom";
import { InputError } from "../InputError";
import { InputElement } from "../InputElement";

export function FormCreatingChannel() {
  const inputRef = useRef();
  const navigate = useNavigate();
  const {
    state,
    onSetInput,
    dispatch,
    validateInput,
    inputStyle,
    handleModal,
  } = useAccountContext();

  const {
    channelName,
    allChannels,
    userId,
    isuserIdError,
    userIdError,
    channelNameError,
    ischannelNameError,
    validError,
    isvalidError,
    allUsers,
  } = state;

  const checkIncluded = allUsers.map((user) => user.id).includes(+userId);
  const validateChannelNameIfExist = allChannels
    .map((channel) => channel.name.toLowerCase())
    .includes(channelName.toLowerCase());

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function handleCreateChannel(e) {
    e.preventDefault();
    const fields = ["channelName", "userId"];

    try {
      for (const field of fields) {
        switch (field) {
          case "channelName":
            if (!state[field]) {
              validateInput("channelName", "Channel Name can't be empty");
              return;
            }
            break;
          case "userId":
            if (!state[field]) {
              validateInput("userId", "User Id can't be empty");
              return;
            }
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
      if (validateChannelNameIfExist) {
        dispatch({
          type: "INVALID_INPUT",
          payload: "Channel already exist.",
        });
        return;
      }
      const res = await axiosFetch.post(`/channels`, {
        name: channelName,
        user_ids: [+userId],
      });

      // CHECK IF THE CHANNEL INPUT NAME IS IS ALREADY BEEN TAKEN
      if (res.data.errors) {
        dispatch({
          type: "INVALID_INPUT",
          payload: res.data.errors[0],
        });
        return;
      } else {
        navigate(`/dashboard/${res.data.data.id}`);
        dispatch({ type: "CREATE_CHANNEL" });
      }

      //UPDATE DISPLAYING CHANNELS
      const updatedRes = await axiosFetch.get(`/channels`);
      const updatedChannels = updatedRes.data.data;
      dispatch({ type: "GET_ALL_CHANNELS", payload: updatedChannels });
      handleModal("isOpenChannelForm", false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`h-screen ${
        allChannels.length === 0 ? "creating__channel" : ""
      }`}
    >
      <form
        className="absolute top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%] z-30 shadow-[0_0_1rem_rgba(0,0,0,0.3)]  w-[40rem]  justify-center flex flex-col gap-8 mx-auto bg-white px-12 pt-16 pb-12 rounded-md"
        onSubmit={handleCreateChannel}
      >
        <i
          data-testid="open-channel-form"
          className="fa-solid fa-xmark absolute top-6 right-10 text-3xl cursor-pointer"
          onClick={() => {
            dispatch({ type: "CREATE_CHANNEL" });
            handleModal("isOpenChannelForm", false);
          }}
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
          <button className="bg-fuchsia-950 text-white text-xl py-4 px-6 rounded-md">
            Create Channel
          </button>
        </div>
      </form>
    </div>
  );
}
