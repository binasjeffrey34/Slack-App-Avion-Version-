import React, { useEffect } from "react";
import { useAccountContext } from "../Context/AccountContext";
import { axiosFetch } from "../api/api-get";
import { API_URL } from "../constant/apiUrl";

export function FormCreatingChannel({ setIsOpenChannel }) {
  const { state, onSetInput, dispatch } = useAccountContext();
  const { channelName, getAllChannels } = state;

  async function createChannel() {
    try {
      const response = await axiosFetch.post(`${API_URL}/api/v1/channels`, {
        name: channelName,
        user_ids: [2896],
      });

      console.log("Channel created:", response.data);

      setIsOpenChannel(false);
      dispatch({ type: "SHOW_MODALCHANNELFORM", payload: false });
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  }

  function handleCreateChannel(e) {
    e.preventDefault();
    createChannel();
  }

  // useEffect(() => {
  //   async function getAllChannels() {
  //     try {
  //       const res = await axiosFetch.get(`${API_URL}/api/v1/channels/5080`);
  //       console.log("Success getting channels", res);
  //     } catch (error) {
  //       console.log("Error getting channels");
  //     }
  //   }
  //   getAllChannels();
  // }, []);
  return (
    <>
      <form
        className="absolute top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%] z-10 shadow-[0_0_1rem_rgba(0,0,0,0.3)] h-[10rem] w-[40rem] items-center justify-center flex mx-auto bg-white"
        onSubmit={handleCreateChannel}
      >
        <i
          className="fa-solid fa-xmark absolute top-4 right-6 text-2xl cursor-pointer"
          onClick={() => {
            setIsOpenChannel(false);
            dispatch({ type: "SHOW_MODALCHANNELFORM", payload: false });
          }}
        ></i>
        <div className="relative">
          <input
            type="text"
            name="channelName"
            className={`border p-4 rounded-sm text-xl w-full `}
            placeholder="Create a new channel"
            value={channelName}
            onChange={onSetInput}
          />
        </div>

        <button className="bg-blue-500 text-white text-xl py-4 px-6 ml-4 rounded-md">
          Create Channel
        </button>
      </form>
    </>
  );
}
