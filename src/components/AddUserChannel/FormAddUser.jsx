import { useEffect, useRef, useState } from "react";
import { useAccountContext } from "../../Context/AccountContext";
import { axiosFetch } from "../../api/api-get";
import { useParams } from "react-router-dom";
import { InputError } from "../InputError";
import { useServices } from "../../services/useServices";

export function FormAddUser() {
  const [isUser, setIsUser] = useState(false);
  const {
    onSetInput,
    state,
    dispatch,
    validateInput,
    inputStyle,
    handleModal,
  } = useAccountContext();
  const {
    addUserInput,
    allUsers,
    filteredAllUsers,
    addUserInputError,
    isaddUserInputError,
    validError,
    isvalidError,
    channelListMember,
  } = state;
  const { channelId } = useParams();
  const inputRef = useRef();

  const addUserInputLower = addUserInput.toLowerCase();
  const validateUserNameIfExist = channelListMember.some(
    (member) => member.name.toLowerCase() === addUserInputLower
  );
  const validateUserEmailIfExist = channelListMember.some(
    (member) => member.email.toLowerCase() === addUserInputLower
  );

  //FOCUS ON INPUT
  useEffect(() => {
    inputRef.current.focus();
    if (addUserInput.length > 0) {
      setIsUser(true);
      dispatch({ type: "ADD_MEMBER", payload: addUserInput });
    } else {
      setIsUser(false);
    }
  }, [addUserInput, dispatch]);

  async function handleAddUser(e) {
    e.preventDefault();
    //FINDING THE USER BY NAME OR EMAIL
    const inputVal = addUserInput.toLowerCase();
    if (!inputVal) {
      validateInput("addUserInput", "Input can't be empty");
      return;
    }
    if (validateUserEmailIfExist || validateUserNameIfExist) {
      validateInput("addUserInput", "Member already exists");
      return;
    }
    const getUser = filteredAllUsers.find(
      (user) => user.uid === inputVal || user.name === inputVal
    );
    const addUser = {
      id: channelId,
      member_id: getUser.id,
    };
    try {
      //ADDING USER TO A CHANNEL
      const res = await axiosFetch.post(`/channel/add_member`, addUser);

      dispatch({
        type: "STORE_ADDED_USER_TO_CHANNEL",
        payload: res.data.data.channel_members,
      });

      //UPDATE DISPLAYING ALL MEMBER IN A CHANNEL

      const getAllMember = await useServices.getChannelMembers(
        allUsers,
        channelId
      );
      dispatch({
        type: "GET_ALL_MEMBER",
        payload: getAllMember,
      });

      //DISPLAYING THE NUMBERS OF USERS
      dispatch({
        type: "NUMBER_OF_USERS",
        payload: getAllMember.length,
      });
      //CLOSING THE ADDING USER FORM MODAL
      handleModal("isOpenAddUserForm", false);
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
        onClick={() => handleModal("isOpenAddUserForm", false)}
      ></i>
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          name="addUserInput"
          className={inputStyle(isaddUserInputError)}
          placeholder="Enter a name or email"
          value={addUserInput}
          onChange={onSetInput}
        />
        {isaddUserInputError && <InputError>{addUserInputError}</InputError>}
        {isvalidError && <InputError>{validError}</InputError>}
      </div>
      {isUser && (
        <div className="list__all-users  w-full bg-white overflow-y-scroll flex flex-col gap-4">
          {filteredAllUsers.map(({ name, id, image }) => (
            <p
              key={id}
              className="flex gap-4 items-center text-2xl border-b-[1px]  hover:cursor-pointer hover:bg-gray-100 py-4 rounded-lg"
              onClick={() =>
                dispatch({ type: "SELECT_ADD_MEMBER", payload: name })
              }
            >
              <img src={image} alt="" className="w-12 h-12 rounded-lg" />
              <span>{name}</span>
            </p>
          ))}
        </div>
      )}

      <div className="text-right">
        <button className="bg-fuchsia-950 text-white text-xl py-4 px-6 rounded-md w-1/4">
          Add User
        </button>
      </div>
    </form>
  );
}
