import { useAccountContext } from "../../Context/AccountContext";
import { useEffect, useRef } from "react";

export function SearchMember() {
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
    <div className="relative mb-4">
      <input
        type="text"
        ref={inputRef}
        onChange={handleSearchMember}
        name="searchMemberInput"
        placeholder="Find Member"
        className="border p-3 md:p-4 pl-16 rounded-lg text-xl md:text-2xl w-full font-medium "
      />
      <i className="fa-solid fa-magnifying-glass absolute left-8 top-1/2 translate-x-[-50%] translate-y-[-50%] text-2xl text-gray-400"></i>
    </div>
  );
}
