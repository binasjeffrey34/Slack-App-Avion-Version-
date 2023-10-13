import { useState } from "react";
import { useAccountContext } from "../Context/AccountContext";
import { FormCreatingChannel } from "./FormCreatingChannel";
import { Link } from "react-router-dom";

export function SideBar() {
  const { dispatch, state } = useAccountContext();
  const [isOpenChannel, setIsOpenChannel] = useState(false);
  const { logInAccount } = state;

  return (
    <section className="bg-[rgba(255,255,255,0.75)] p-6">
      <p className="text-2xl py-3 text-gray-600 font-medium rounded-md mb-4">
        <i className="fa-solid fa-caret-down mr-2"></i> Channels
      </p>

      <ul className="pl-10">
        {logInAccount?.channelList?.map(({ channelName, id }, i) => (
          <li className="text-2xl mb-4 flex gap-6" key={i}>
            <Link
              to={`channel/${channelName}`}
              onClick={() => dispatch({ type: "SELECT_CHANNEL", payload: id })}
            >
              <span>{channelName}</span>{" "}
            </Link>

            <span>
              <i
                className="fa-solid fa-trash-can cursor-pointer text-gray-600"
                onClick={() =>
                  dispatch({ type: "DELETE_CHANNEL", payload: id })
                }
              ></i>
            </span>
          </li>
        ))}
      </ul>
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
