import { useAccountContext } from "../../Context/AccountContext";
import { Loading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";
import { useParams } from "react-router-dom";
import sortMemberUtils from "../../utils/sortMemberUtils";

export function HeaderChannelPage({ status }) {
  const {
    state: { allChannels, numbersOfUser, accountLogIn, filteredListMember },
    handleModal,
    dispatch,
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
      <div className="flex items-center gap-3" data-testid="OpenAddUserChannel">
        <div
          className="flex items-center gap-2 hover:cursor-pointer hover:bg-gray-100 px-3  h-14 rounded-2xl border "
          onClick={() => {
            handleModal("isOpenAddUserChannel", true);
            dispatch({ type: "SET_ACTIVE_TAB", payload: "member" });
          }}
        >
          <div className="flex items-center relative right-4">
            {sortMemberUtils(filteredListMember, accountLogIn)
              .slice(0, 3)
              .map((member, i) => (
                <img
                  key={member.id}
                  src={member?.image}
                  alt=""
                  className={`w-10 h-10 rounded-md   ${
                    i === 1 ? "relative left-2 z-10" : ""
                  }  ${i === 0 ? "relative z-20 left-4" : ""}`}
                />
              ))}
          </div>

          {status === "loading" && <Loading />}
          {status === "error" && <ErrorMessage />}
          {status === "success" && (
            <span className="text-xl text-gray-600 font-medium">
              {numbersOfUser}
            </span>
          )}
        </div>
        <div className="text-gray-600 px-3 h-14 rounded-2xl border flex items-center gap-2 justify-end">
          <i className="fa-solid fa-headphones-simple border-r-[1px] border-slate-300 pr-4"></i>

          <i className="fa-solid fa-angle-down ml-2 text-xl relative top-1 "></i>
        </div>
        <div className="px-3 h-14 flex items-center  rounded-2xl border ">
          <i className="fa-regular fa-note-sticky "></i>
        </div>
      </div>
    </div>
  );
}
