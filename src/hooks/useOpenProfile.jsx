import { useEffect } from "react";
import { useAccountContext } from "../Context/AccountContext";

function useOpenProfile(id, property, value) {
  const { handleModal } = useAccountContext();

  useEffect(() => {
    if (id) {
      handleModal(property, value);
    }
  }, [handleModal, value, id, property]);
}

export default useOpenProfile;
