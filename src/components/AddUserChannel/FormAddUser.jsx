import { useEffect, useRef } from "react";
import { useAccountContext } from "../../Context/AccountContext";
import { axiosFetch } from "../../api/api-get";
import { API_URL } from "../../constant/apiUrl";

export function FormAddUser() {
  const { onSetInput, state, dispatch } = useAccountContext();
  const { addUserInput, allUsers } = state;
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function handleAddUser(e) {
    e.preventDefault();
    const getUser = allUsers.find(
      (user) => user.uid === addUserInput || user.name === addUserInput
    );
    console.log(getUser);
    try {
      const addUser = {
        id: 5080,
        member_id: getUser.id,
      };

      const res = await axiosFetch.post(
        `${API_URL}/api/v1/channel/add_member`,
        addUser
      );
      dispatch({ type: "ADD_USER", payload: res.data.data.channel_members });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleAddUser}
      className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[50rem] z-50 shadow-[0_0_1rem_rgba(0,0,0,0.1)] bg-white px-10 pt-16 pb-10  flex flex-col gap-10 rounded-lg"
    >
      <i
        className="fa-solid fa-xmark absolute top-4 right-6 text-2xl cursor-pointer"
        onClick={() => {
          dispatch({
            type: "SHOW_MODAL",
            payload: { name: "isOpenAddUserForm", value: false },
          });
        }}
      ></i>
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          name="addUserInput"
          className={`border p-6 text-xl w-full rounded-md `}
          placeholder="Enter a name or email"
          value={addUserInput}
          onChange={onSetInput}
        />
      </div>
      <div className="text-right">
        <button className="bg-blue-500 text-white text-xl py-4 px-6 rounded-md w-1/4">
          Add User
        </button>
      </div>
    </form>
  );
}
