import { useAccountContext } from "../../Context/AccountContext";
import { axiosFetch } from "../../api/api-get";
import loading from "../../assets/loading.svg";
import profileLogo from "../../assets/profilelogo.png";

import { useEffect, useRef } from "react";
import { AllMemberList } from "./AllMemberList";
export function AddUserChannel() {
  const { state, dispatch } = useAccountContext();
  const { status, allUsers } = state;

  useEffect(() => {
    async function getChannelDetails() {
      try {
        const res = await axiosFetch.get("/api/v1/channels/5080");
        const allMember = res.data.data.channel_members;
        const getallMember = allUsers
          .filter((user) =>
            allMember.some((userchannel) => user.id === userchannel.user_id)
          )
          .map((user) => ({
            ...user,
            name: user.email.split("@")[0],
            image: profileLogo,
          }));
        console.log(getallMember);
        dispatch({
          type: "GET_USERS_CHANNEL",
          payload: getallMember,
        });
      } catch (error) {
        dispatch({ type: "GET_USERS-CHANNEL-FAILED" });
      }
    }

    getChannelDetails();
  }, [dispatch, allUsers]);

  return (
    <section className="absolute  top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-[0_0_1rem_rgba(0,0,0,0.1)] z-10 bg-white w-[55rem] h-[80vh] px-12 py-20 rounded-lg">
      <i
        className="fa-solid fa-xmark absolute top-4 right-6 text-2xl cursor-pointer"
        onClick={() => {
          dispatch({
            type: "SHOW_MODAL",
            payload: { name: "isOpenAddUserChannel", value: false },
          });
        }}
      ></i>
      <SearchMember />
      <AddPeople />
      <div className="channel__member-list flex flex-col gap-4">
        {status === "loading" && <Loading />}
        {status === "error" && <ErrorMessage />}
        {status === "success" && <AllMemberList />}
      </div>
    </section>
  );
}

function AddPeople() {
  const { dispatch } = useAccountContext();
  return (
    <div
      className="text-2xl flex  items-center gap-4 mb-6 font-bold hover:cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
      onClick={() => {
        dispatch({
          type: "SHOW_MODAL",
          payload: { name: "isOpenAddUserForm", value: true },
        });
      }}
    >
      <i className="fa-solid fa-user-plus text-3xl p-2 bg-[#1d9bd11a] rounded-md text-slate-900"></i>
      <span>Add People</span>
    </div>
  );
}

function SearchMember() {
  const { dispatch } = useAccountContext();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSearchMember(e) {
    const { name, value } = e.target;
    dispatch({
      type: "SET_INPUT",
      payload: { name, value },
    });

    dispatch({ type: "SEARCH_MEMBER", payload: value });
  }

  return (
    <div className="relative mb-8">
      <input
        type="text"
        ref={inputRef}
        onChange={handleSearchMember}
        name="searchMemberInput"
        placeholder="Find Member"
        className="border p-4 pl-16 rounded-lg text-2xl w-full font-medium "
      />
      <i className="fa-solid fa-magnifying-glass absolute left-8 top-1/2 translate-x-[-50%] translate-y-[-50%] text-2xl text-gray-400"></i>
    </div>
  );
}

function Loading() {
  return (
    <div className="spinner text-2xl">
      <img src={loading} alt="loading" />
      <span>Loading members. . .</span>
    </div>
  );
}

function ErrorMessage() {
  return <p className="error__message">Error: User Not Found</p>;
}
