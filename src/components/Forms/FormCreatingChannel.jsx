import { useEffect, useRef } from "react";
import { useAccountContext } from "../../Context/AccountContext";
import { axiosFetch } from "../../api/api-get";
import { useNavigate } from "react-router-dom";

export function FormCreatingChannel() {
  const { state, onSetInput, dispatch, validateInput, checkError } =
    useAccountContext();
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
  console.log(checkIncluded);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function handleCreateChannel(e) {
    e.preventDefault();
    try {
      if (!channelName) {
        validateInput("channelName", "Channel Name can't be empty");
        return;
      }

      if (!userId) {
        validateInput("userId", "User Id can't be empty");
        return;
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

      dispatch({
        type: "SHOW_MODAL",
        payload: { name: "isOpenChannelForm", value: false },
      });
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
          onClick={() => {
            dispatch({
              type: "SHOW_MODAL",
              payload: { name: "isOpenChannelForm", value: false },
            });
          }}
        ></i>
        <h1 className="text-4xl font-bold mb-4">Create a Channel</h1>
        <div className="relative w-full">
          <input
            type="text"
            ref={inputRef}
            name="channelName"
            className={`border p-4 rounded-sm text-xl w-full ${checkError(
              ischannelNameError
            )} `}
            placeholder="Create a new channel"
            value={channelName}
            onChange={onSetInput}
          />
          {ischannelNameError && (
            <small className="text-lg text-red-500 absolute bottom-[-1.8rem] left-0">
              {channelNameError}
            </small>
          )}
        </div>
        <div className="relative w-full">
          <input
            type="number"
            name="userId"
            className={`border p-4 rounded-sm text-xl w-full ${checkError(
              isuserIdError
            )} `}
            placeholder="User ID"
            value={userId}
            onChange={onSetInput}
          />
          {isuserIdError && (
            <small className="text-lg text-red-500 absolute bottom-[-1.8rem] left-0">
              {userIdError}
            </small>
          )}
        </div>
        {isvalidError && (
          <small className="text-lg text-red-500 absolute bottom-[7rem] left-12">
            {validError}
          </small>
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
