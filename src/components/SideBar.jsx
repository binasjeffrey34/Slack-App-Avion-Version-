import { useState } from "react";
import { useAccountContext } from "../Context/AccountContext";
import { FormCreatingChannel } from "./FormCreatingChannel";

export function SideBar() {
  const { dispatch } = useAccountContext();
  const [isOpenChannel, setIsOpenChannel] = useState(false);

  return (
    <section className="bg-[rgba(255,255,255,0.75)] p-6">
      <p className="text-2xl py-3 text-gray-600 font-medium rounded-md mb-4">
        <i className="fa-solid fa-caret-down mr-2"></i> Channels
      </p>

      <p
        className="text-2xl py-3 text-gray-600 font-medium rounded-md mb-4 hover:cursor-pointer"
        onClick={() => {
          setIsOpenChannel(true);
          dispatch({ type: "SHOW_MODALCHANNELFORM", payload: true });
        }}
      >
        <i className="fa-solid fa-plus mr-2"></i> Add Channels
      </p>
      <p className="text-2xl py-3 text-gray-600 font-medium rounded-md mb-4">
        <i className="fa-solid fa-caret-down mr-2"></i> Direct messages
      </p>

      {isOpenChannel && (
        <FormCreatingChannel setIsOpenChannel={setIsOpenChannel} />
      )}
    </section>
  );
}
