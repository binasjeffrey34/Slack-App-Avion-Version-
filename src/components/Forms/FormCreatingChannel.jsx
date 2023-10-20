import { useEffect, useRef } from "react";
import { useAccountContext } from "../../Context/AccountContext";
import { axiosFetch } from "../../api/api-get";
import { useNavigate } from "react-router-dom";

export function FormCreatingChannel() {
  const { state, onSetInput, dispatch } = useAccountContext();
  const inputRef = useRef();
  const { channelName, userId } = state;
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function handleCreateChannel(e) {
    e.preventDefault();
    try {
      const res = await axiosFetch.post(`/api/v1/channels`, {
        name: channelName,
        user_ids: [userId],
      });

      navigate(`/dashboard/${res.data.data.id}`);

      dispatch({
        type: "SHOW_MODAL",
        payload: { name: "isOpenChannelForm", value: false },
      });
      dispatch({ type: "CREATE_CHANNEL" });

      //UPDATE DISPLAYING CHANNELS
      const updatedRes = await axiosFetch.get(`/api/v1/channels`);
      const updatedChannels = updatedRes.data.data;
      dispatch({ type: "GET_ALL_CHANNELS", payload: updatedChannels });
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  }

  return (
    <>
      <form
        className="absolute top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%] z-10 shadow-[0_0_1rem_rgba(0,0,0,0.3)]  w-[40rem]  justify-center flex flex-col gap-6 mx-auto bg-white px-12 pt-16 pb-12 rounded-md"
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
            className={`border border-slate-300 p-4 rounded-sm text-xl w-full `}
            placeholder="Create a new channel"
            value={channelName}
            onChange={onSetInput}
          />
        </div>
        <div className="relative w-full">
          <input
            type="number"
            name="userId"
            className={`border border-slate-300 p-4 rounded-sm text-xl w-full `}
            placeholder="User ID"
            value={userId}
            onChange={onSetInput}
          />
        </div>
        <div className="text-right">
          <button className="bg-blue-500 text-white text-xl py-4 px-6 rounded-md">
            Create Channel
          </button>
        </div>
      </form>
    </>
  );
}
