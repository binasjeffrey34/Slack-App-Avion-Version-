import { useAccountContext } from "../../Context/AccountContext";
import { useParams } from "react-router-dom";
import sortMemberUtils from "../../utils/sortMemberUtils";

export function HeaderChannelPage() {
  const {
    state: { allChannels, numbersOfUser, accountLogIn, filteredListMember },
    handleModal,
    dispatch,
  } = useAccountContext();
  const { channelId } = useParams();

  const findChannel = allChannels.find((channel) => channel.id === +channelId);

  return (
    <div className="absolute top-0 left-0 h-[clamp(4rem,4.5vw,5rem)] w-full text-gray-900 z-10 border-b-[1px] flex justify-between items-center px-4 md:px-6 text-2xl md:text-3xl bg-white border">
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
        className="flex items-center gap-2 md:gap-3"
        data-testid="OpenAddUserChannel"
      >
        <div
          className="flex items-center gap-2 hover:cursor-pointer hover:bg-gray-100 px-3  h-12 md:h-14 rounded-2xl border "
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
                  className={`w-8 md:w-10 h-8 md:h-10 rounded-md   ${
                    i === 1 ? "relative left-2 z-10" : ""
                  }  ${i === 0 ? "relative z-20 left-4" : ""}`}
                />
              ))}
          </div>

          <span className="text-lg md:text-xl text-gray-600 font-medium">
            {numbersOfUser}
          </span>
        </div>
        <div className="text-gray-600 px-3 h-12 md:h-14 rounded-2xl border  items-center gap-2 justify-end hidden md:flex">
          <i className="fa-solid fa-headphones-simple border-r-[1px] border-slate-300 pr-4 text-lg md:text-xl"></i>

          <i className="fa-solid fa-angle-down ml-2 text-lg md:text-xl relative top-1 "></i>
        </div>
        <div className=" text-lg md:text-xl px-3 h-12 md:h-14 hidden md:flex items-center  rounded-2xl border ">
          <i className="fa-regular fa-note-sticky "></i>
        </div>
      </div>
    </div>
  );
}
