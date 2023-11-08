import { Link, useNavigate, useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";
import useUpdateSelectedAccount from "../../hooks/useUpdateSelectedAccount";
import { ProfileContactInformation } from "../ProfileContactInformation";

export function ChannelProfilePage() {
  const { state, dispatch, handleModal } = useAccountContext();
  const { selectedUser, accountLogIn } = state;
  const { userId, channelId } = useParams();
  const navigate = useNavigate();
  const option = {
    hour: "numeric",
    minute: "numeric",
  };

  useUpdateSelectedAccount("selectedUser", "SELECTED_USER", userId);

  return (
    <section className="bg-white w-[40rem]  text-xl border-l-[1px]">
      <div className=" h-[5rem] border-b-[1px] flex items-center justify-between px-8 text-3xl text-slate-800">
        <h1 className=" font-bold">Profile</h1>
        <i
          className="fa-solid fa-xmark cursor-pointer"
          onClick={() => {
            handleModal("isProfileOpen", false);

            navigate(`/dashboard/${channelId}`);
          }}
        ></i>
      </div>
      <div className="channel__profile">
        <div className="p-8  border-b-[1px]">
          <img
            src={selectedUser?.image}
            alt=""
            className="w-[34rem] h-[25rem] rounded-xl mx-auto mb-6 shadow-[0_0__rgba(0,0,0,0.1)]"
          />
          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            {selectedUser?.name}
          </h1>
          <p className="flex gap-2 items-center mb-6 text-2xl">
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
              to={`/dashboard/direct_message/${channelId}/${userId}`}
              onClick={() => {
                handleModal("isProfileOpen", false);
                handleModal("isDirectMessageOpen", false);
                dispatch({
                  type: "STORE_TO_DIRECT_MESSAGE",
                  payload: userId,
                });
              }}
              className="w-full py-3 rounded-md border-[1px] border-slate-400 font-medium text-2xl text-center"
            >
              <button>
                {" "}
                <i className="fa-regular fa-comment"></i> Message
              </button>
            </Link>
            <button className="py-3 px-6 rounded-md border-[1px] border-slate-400 font-medium text-2xl ">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </p>
        </div>
        <ProfileContactInformation
          option={option}
          url="/dashboard"
          selectedAcc={accountLogIn.id}
          selectedProf={selectedUser}
        />
      </div>
    </section>
  );
}
