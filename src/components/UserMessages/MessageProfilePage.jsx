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
    <section className="bg-white w-[40rem]  text-xl border-l-[1px]">
      <div className=" h-[5rem] border-b-[1px] flex items-center justify-between px-8 text-3xl text-slate-800">
        <h1 className=" font-bold">Profile</h1>
        <i
          className="fa-solid fa-xmark cursor-pointer"
          onClick={() => {
            handleModal("isDirectMessageOpen", false);

            navigate(`/dashboard/direct_message/${channelId}/${receiverId}`);
          }}
        ></i>
      </div>
      <div className="channel__profile">
        <div className="p-8  border-b-[1px]">
          <img
            src={selectedProfile?.image}
            alt=""
            className=" w-96 h-96 rounded-lg mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            {selectedProfile?.name}
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
          <Link
            to={`/dashboard/direct_message/${channelId}/${id}`}
            onClick={() => {
              handleModal("isDirectMessageOpen", false);

              dispatch({ type: "STORE_TO_DIRECT_MESSAGE", payload: id });
            }}
          >
            <button className="w-full py-3 rounded-md border-[1px] border-slate-400 font-medium text-2xl ">
              {" "}
              <i className="fa-regular fa-comment"></i> Message
            </button>
          </Link>
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
