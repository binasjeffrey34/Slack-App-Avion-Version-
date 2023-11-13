import { Link, useNavigate, useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";

export function LogOut({ onSetOpenProfile }) {
  const {
    dispatch,
    state: { accountLogIn, allUsers },
  } = useAccountContext();
  const { channelId } = useParams();
  const navigate = useNavigate();
  const findAccount = allUsers.find((user) => user.id === accountLogIn.id);
  const account = findAccount && {
    ...accountLogIn,
    image: findAccount.image,
    name: accountLogIn.email.split("@")[0],
  };
  return (
    <div className="absolute bottom-10  left-24 bg-gray-50 text-gray-600 text-2xl  w-[30rem] z-50 shadow-[0_5px_1.5rem_rgba(0,0,0,0.15)] rounded-lg text-left">
      <div className="pt-8 px-10 pb-6 border-b-[1px] flex flex-col gap-4">
        <div className="flex items-center gap-4 mb-4">
          <img src={account.image} alt="" className="w-16 h-16 rounded-xl" />
          <p>
            <span className="block font-bold text-2xl">
              {accountLogIn.name}
            </span>
            <span>
              {" "}
              <i className="fa-solid fa-caret-right text-green-600  rotate-45 text-4xl relative top-1.5"></i>{" "}
              Active
            </span>
          </p>
        </div>
        <div className="flex items-center gap-6 rounded-lg py-2 px-6 bg-white border-[1px] border-slate-300 mb-4 text-gray-400">
          <i className="fa-regular fa-face-smile py-2 "></i>
          <p>Update your Status</p>
        </div>
        <p className="mb-4">
          Set yourself as <strong className="text-2xl">Away</strong>
        </p>
        <p className="flex items-center justify-between">
          <span>Pause notifications</span>
          <i className="fa-solid fa-angle-right text-gray-400 text-xl"></i>
        </p>
      </div>
      <ul className="py-6 px-10  border-b-[1px] flex flex-col">
        <li className="mb-4">
          <Link
            to={`/dashboard/${channelId}/${accountLogIn.id}`}
            onClick={() => onSetOpenProfile(false)}
          >
            Profile
          </Link>
        </li>
        <li>Preference</li>
        <li></li>
      </ul>
      <p
        onClick={() => {
          localStorage.clear();
          dispatch({ type: "LOG_OUT" });
          navigate("/");
        }}
        className="py-6 px-10 cursor-pointer "
      >
        Sign Out
      </p>
    </div>
  );
}
