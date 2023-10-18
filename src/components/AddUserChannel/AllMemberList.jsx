import { Link } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";

export function AllMemberList() {
  const { state, dispatch } = useAccountContext();
  const { filteredListMember, accountLogIn } = state;

  return (
    <ul>
      {[...filteredListMember].reverse().map(({ name, image, id }) => {
        const checkOwner = accountLogIn.id === id;
        return (
          <Link
            key={id}
            to={`${id}`}
            onClick={() => {
              dispatch({
                type: "SHOW_MODAL",
                payload: { name: "isProfileOpen", value: true },
              });
              dispatch({
                type: "SHOW_MODAL",
                payload: { name: "isOpenAddUserChannel", value: false },
              });
            }}
          >
            <li className="flex gap-4 items-center text-2xl border-b-[1px]  hover:cursor-pointer hover:bg-gray-100 py-4 rounded-lg">
              <img src={image} className="w-10 rounded-full" alt="" />
              <span>
                {name[0].toUpperCase() + name.slice(1)}{" "}
                {checkOwner && <small className="text-2xl">(you)</small>}
              </span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
