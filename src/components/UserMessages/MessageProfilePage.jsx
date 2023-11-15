import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";
import useUpdateSelectedAccount from "../../hooks/useUpdateSelectedAccount";
import { ProfileContactInformation } from "../ProfileContactInformation";

export function MesageProfilePage() {
  const { state, dispatch, handleModal } = useAccountContext();
  const { selectedProfile, accountLogIn } = state;
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { receiverId, channelId } = useParams();
  const navigate = useNavigate();
  const option = {
    hour: "numeric",
    minute: "numeric",
  };

  useUpdateSelectedAccount("selectedProfile", "SELECTED_PROFILE", id);

  return (
    <section
      className={`bg-white w-full md:w-[clamp(30rem,45vw,45rem)]  text-xl border-l-[1px] absolute  md:relative z-10 left-0`}
    >
      <div className=" h-[5rem] border-b-[1px] flex items-center justify-between px-8 text-2xl md:text-3xl text-slate-800">
        <h1 className=" font-bold">Profile</h1>
        <i
          className="fa-solid fa-xmark cursor-pointer"
          onClick={() => {
            handleModal("isDirectMessageOpen", false);

            navigate(`/dashboard/direct_message/${channelId}/${receiverId}`);
          }}
        ></i>
      </div>
      <div className="profile">
        <div className="p-8  border-b-[1px]">
          <img
            src={selectedProfile?.image}
            alt=""
            className="w-[clamp(25rem,30vw,32rem)] h-[clamp(30rem,35vw,38rem)] rounded-xl mx-auto mb-6 shadow-[0_0__rgba(0,0,0,0.1)]"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            {selectedProfile?.name}
          </h1>
          <p className="flex gap-2 items-center mb-6 text-xl md:text-2xl">
            <i className="fa-regular fa-clock"></i>{" "}
            <span>
              {new Intl.DateTimeFormat(navigator.language, option).format(
                new Date()
              )}
            </span>
            <span>local time</span>
          </p>
          <p className="flex items-center gap-4">
            <Link
              to={`/dashboard/direct_message/${channelId}/${id}`}
              onClick={() => {
                handleModal("isDirectMessageOpen", false);
                dispatch({ type: "STORE_TO_DIRECT_MESSAGE", payload: id });
              }}
              className="w-full flex items-center justify-center h-[clamp(3rem,3.4vw,3.5rem)] rounded-md border-[1px] border-slate-400 font-medium text-xl md:text-2xl text-center"
            >
              <button>
                {" "}
                <i className="fa-regular fa-comment"></i> Message
              </button>
            </Link>
            <button className=" flex items-center justify-center h-[clamp(3rem,3.4vw,3.5rem)] px-4 md:px-6 rounded-md border-[1px] border-slate-400 font-medium text-2xl ">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </p>
        </div>

        <ProfileContactInformation
          option={option}
          url="/dashboard/direct_message"
          selectedAcc={selectedProfile?.id}
          selectedProf={selectedProfile}
          endpoint={`profile?id=${accountLogIn.id}`}
        />
      </div>
    </section>
  );
}
