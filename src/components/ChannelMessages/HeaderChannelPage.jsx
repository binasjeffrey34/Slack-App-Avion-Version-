import { useAccountContext } from "../../Context/AccountContext";
import { Loading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";
import { useParams } from "react-router-dom";

export function HeaderChannelPage({ status }) {
  const {
    state: { allUsers, allChannels, numbersOfUser, accountLogIn },
    handleModal,
    dispatch,
  } = useAccountContext();
  const { channelId } = useParams();

  const findChannel = allChannels.find((channel) => channel.id === +channelId);

  const findAccount = allUsers.find((user) => user.id === accountLogIn.id);
  const account = findAccount && {
    ...accountLogIn,
    image: findAccount.image,
    name: accountLogIn.email.split("@")[0],
  };

  return (
    <div className="absolute top-0 left-0 h-[5rem] w-full text-gray-900 z-[1] border-b-[1px] flex justify-between items-center px-6 text-3xl bg-white border">
      <p className=" font-medium ">
        {" "}
        <span>
          <i className="fa-solid fa-hashtag"></i>
        </span>
        <span
          onClick={() => {
            handleModal("isOpenAddUserChannel", true);
            dispatch({ type: "SET_ACTIVE_TAB", payload: "about" });
          }}
          className="ml-2 cursor-pointer"
        >
          {findChannel?.name}
        </span>
      </p>
      <div
        className="flex items-center gap-4 py-1 px-2 hover:cursor-pointer hover:bg-gray-100 rounded-md "
        onClick={() => {
          handleModal("isOpenAddUserChannel", true);
          dispatch({ type: "SET_ACTIVE_TAB", payload: "member" });
        }}
      >
        <img src={account?.image} alt="" className="w-10 h-10 rounded-md" />
        {status === "loading" && <Loading />}
        {status === "error" && <ErrorMessage />}
        {status === "success" && (
          <span className="text-xl font-medium">{numbersOfUser}</span>
        )}
      </div>
    </div>
  );
}
