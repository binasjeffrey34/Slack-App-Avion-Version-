import { Link, useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";

export function AllMemberList() {
  const { state, handleModal } = useAccountContext();
  const { filteredListMember, accountLogIn } = state;
  const { channelId } = useParams();

  return (
    <ul>
      {[...filteredListMember].reverse().map(({ name, image, id }) => {
        const checkOwner = accountLogIn.id === id;
        return (
          <Link
            key={id}
            to={`${channelId}/${id}`}
            onClick={() => {
              handleModal("isProfileOpen", true);
              handleModal("isOpenAddUserChannel", false);
            }}
          >
            <li className="flex gap-4 items-center text-2xl border-b-[1px]  hover:cursor-pointer hover:bg-gray-100 py-4 rounded-lg">
              <img
                src={image}
                className="w-12 h-12 rounded-lg"
                alt="profileLogo"
              />
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
