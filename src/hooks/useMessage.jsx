import { useEffect, useState } from "react";
import { useAccountContext } from "../Context/AccountContext";
import { useServices } from "../services/useServices";

function useMessage(id, type, classType) {
  const [status, setStatus] = useState("loading");
  const {
    state: { allUsers },
    dispatch,
  } = useAccountContext();

  useEffect(() => {
    async function getMessage() {
      try {
        const messageData = await useServices.getMessages(
          allUsers,
          id,
          classType
        );

        dispatch({
          type,
          payload: messageData,
        });

        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.log(error);
      }
    }

    getMessage();
  }, [id, dispatch, allUsers, type, classType]);

  return status;
}

export default useMessage;
