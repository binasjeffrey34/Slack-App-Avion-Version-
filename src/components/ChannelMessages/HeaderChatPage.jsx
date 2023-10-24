import { useAccountContext } from "../../Context/AccountContext";
import profileLogo from "../../assets/profilelogo.png";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";

export function HeaderChatPage({ status }) {
  const { dispatch } = useAccountContext();
  const {
    state: { allChannels, numbersOfUser },
  } = useAccountContext();
  const { channelId } = useParams();

  const findChannel = allChannels.find((channel) => channel.id === +channelId);

  return (
    <div className="absolute top-0 left-0 h-[5rem] w-full text-gray-900 z-[1] border-b-[1px] flex justify-between items-center px-6 text-3xl bg-white border">
      <p className=" font-medium ">
        {" "}
        <span>
          <i className="fa-solid fa-hashtag"></i>
        </span>
        <span className="ml-2">{findChannel?.name}</span>
      </p>
      <div
        className="flex items-center gap-4 py-1 px-2 hover:cursor-pointer hover:bg-gray-100 rounded-md "
        onClick={() => {
          dispatch({
            type: "SHOW_MODAL",
            payload: { name: "isOpenAddUserChannel", value: true },
          });
        }}
      >
        <img src={profileLogo} alt="" className="w-10 rounded-md" />
        {status === "loading" && <Loading fontsize={"text-lg"} w={8} h={8} />}
        {status === "error" && <ErrorMessage />}
        {status === "success" && (
          <span className="text-xl font-medium">{numbersOfUser}</span>
        )}
      </div>
    </div>
  );
}
