import { useEffect } from "react";
import { useAccountContext } from "../Context/AccountContext";

function useUpdateSelectedAccount(key, type, id) {
  const {
    state: { allUsers },
    dispatch,
  } = useAccountContext();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(key));

    if (storedUser && storedUser.id === +id) {
      dispatch({ type, payload: storedUser });
    } else {
      const user = allUsers.find((user) => user.id === +id);

      if (user) {
        dispatch({ type, payload: user });
        localStorage.setItem(key, JSON.stringify(user));
      }
    }
  }, [id, key, type, allUsers, dispatch]);
}

export default useUpdateSelectedAccount;
