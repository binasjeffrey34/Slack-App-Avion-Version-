import { useEffect, useState } from "react";
import { useAccountContext } from "../Context/AccountContext";
import { useServices } from "../services/useServices";

function useChannelMembers(id, type) {
  const [status, setStatus] = useState("loading");
  const {
    state: { allUsers },
    dispatch,
  } = useAccountContext();
  useEffect(() => {
    async function getAllMembers() {
      try {
        const getAllMember = await useServices.getChannelMembers(allUsers, id);

        dispatch({
          type,
          payload: getAllMember,
        });
        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.log(error);
      }
    }

    getAllMembers();
  }, [dispatch, allUsers, id, type]);
  return status;
}

export default useChannelMembers;
