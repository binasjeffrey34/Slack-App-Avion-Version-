import { useEffect } from "react";
import { axiosFetch } from "../api/api-get";
import generateImg from "../ramdomImage";
import { useAccountContext } from "../Context/AccountContext";

function useAllUsers() {
  const { dispatch } = useAccountContext();
  useEffect(() => {
    async function getAllUsersChannel() {
      try {
        const res = await axiosFetch.get(`/users`);

        const allUsersData = res.data.data
          .map((user) => ({
            ...user,
            name: user.email.split("@")[0],
            image: generateImg(),
          }))
          .filter((user) => user.id > 4000);

        dispatch({ type: "GET_ALL_USERS", payload: allUsersData });
        localStorage.setItem("allUsers", JSON.stringify(allUsersData));
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsersChannel();
  }, [dispatch]);
}

export default useAllUsers;
