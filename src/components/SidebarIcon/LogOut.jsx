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
    <div className="absolute bottom-10  left-24 bg-slate-100 text-gray-600 text-2xl  w-[27rem] h-[27rem] z-50 shadow-[0_5px_1.5rem_rgba(0,0,0,0.15)] rounded-lg text-left">
      <div className="pt-8 px-10 pb-6 border-b-[1px] flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img src={account.image} alt="" className="w-16 h-16" />
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
        <p>
          Set yourself as <strong>Away</strong>
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

          <Link to={`/dashboard/${channelId}/${accountLogIn.id}`}>Profile</Link>

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
