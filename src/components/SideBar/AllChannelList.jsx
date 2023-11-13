import { useAccountContext } from "../../Context/AccountContext";
import { NavLink } from "react-router-dom";

export function AllChannelList() {
  const {
    state: { allChannels },
    dispatch,
  } = useAccountContext();

  return (
    <ul className={allChannels.length > 6 ? "channel__box" : ""}>
      {allChannels.map((channel) => (
        <NavLink
          key={channel.id}
          to={`${channel.id}`}
          onClick={() => {
            dispatch({ type: "OPEN_MODAL_SIDEBAR" });
          }}
          className="channel__list text-xl md:text-2xl  flex gap-4 ml-4 mb-2 font-medium text-slate-600 py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-[#daa5dc] hover:text-white "
        >
          <li className=" flex gap-4">
            <span>
              <i className="fa-solid fa-hashtag"></i>
            </span>
            <span>{channel?.name}</span>
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
