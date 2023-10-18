import { useState, useEffect } from "react";
import { useAccountContext } from "../Context/AccountContext";
import { FormCreatingChannel } from "./FormCreatingChannel";
import { axiosFetch } from "../api/api-get";
import { API_URL } from "../constant/apiUrl";

export function SideBar() {
  const { dispatch, state } = useAccountContext();
  const [isOpenChannel, setIsOpenChannel] = useState(false);

  const { getAllChannels } = state;
  console.log(getAllChannels);

  useEffect(() => {
    async function getAllChannels() {
      try {
        const res = await axiosFetch.get(`${API_URL}/api/v1/channels`);
        console.log(res);

        dispatch({ type: "GET_ALL_USERS", payload: res.data.data });
      } catch (error) {
        console.log("Error getting channels");
      }
    }
    getAllChannels();
  }, []);

  return (
    <section className="bg-[rgba(255,255,255,0.75)] p-6">
      <p className="text-2xl py-3 text-gray-600 font-medium rounded-md mb-4">
        <i className="fa-solid fa-caret-down mr-2"></i> Channels
      </p>

      <p
        className="text-2xl py-3 text-gray-600 font-medium rounded-md mb-4 hover:cursor-pointer"
        onClick={() => {
          setIsOpenChannel(true);
          dispatch({ type: "SHOW_MODALCHANNELFORM", payload: true });
        }}
      >
        <i className="fa-solid fa-plus mr-2"></i> Add Channels
      </p>

      {getAllChannels.map((channel) => (
        <p key={channel.id}>{channel.name}</p>
      ))}
      <p className="text-2xl py-3 text-gray-600 font-medium rounded-md mb-4">
        <i className="fa-solid fa-caret-down mr-2"></i> Direct messages
      </p>

      {isOpenChannel && (
        <FormCreatingChannel setIsOpenChannel={setIsOpenChannel} />
      )}
    </section>
  );
}
