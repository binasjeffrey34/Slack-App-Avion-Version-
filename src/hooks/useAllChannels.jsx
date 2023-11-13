import { useEffect } from "react";
import { useAccountContext } from "../Context/AccountContext";
import { axiosFetch } from "../api/api-get";

function useAllChannels() {
  const { dispatch } = useAccountContext();
  useEffect(() => {
    async function getAllChannels() {
      try {
        const res = await axiosFetch.get(`/channels`);
        const allChannel = res.data.data;
        localStorage.setItem("allChannels", JSON.stringify(allChannel));

        dispatch({ type: "GET_ALL_CHANNELS", payload: allChannel });
      } catch (error) {
        console.log("Error getting channels");
      }
    }
    getAllChannels();
  }, [dispatch]);
}

export default useAllChannels;
