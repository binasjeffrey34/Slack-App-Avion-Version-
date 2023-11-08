import { useAccountContext } from "../../Context/AccountContext";
import { NavLink, useParams } from "react-router-dom";

export function AllDirectMessage() {
  const {
    state: { allDirectMessage, accountLogIn },
    dispatch,
    handleModal,
  } = useAccountContext();
  const { channelId } = useParams();

  return (
    <ul className={allDirectMessage.length > 4 ? "directMesage__box" : ""}>
      {allDirectMessage.map((user) => (
        <NavLink
          key={user?.id}
          onClick={() => {
            dispatch({ type: "SELECTED_USER", payload: user });
            handleModal("isDirectMessageOpen", false);
          }}
          to={`/dashboard/direct_message/${channelId}/${user?.id}`}
          className="user__list text-2xl flex gap-4 ml-4 mb-2 font-medium text-slate-600 py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-[#daa5dc] hover:text-white "
        >
          <li className=" flex items-center gap-4">
            <img src={user?.image} alt="" className="w-12 h-12 rounded-lg " />
            <span>
              <span>{user?.name} </span>
              <span className={`text-gray-400 font-normal ml-2`}>
                {accountLogIn.id === user?.id ? "you guest" : "guest"}{" "}
              </span>
            </span>
            <span
              onClick={() =>
                dispatch({
                  type: "DELETE_USER_DIRECT_MESSAGE",
                  payload: user.id,
                })
              }
              className="btn__delete hidden"
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
