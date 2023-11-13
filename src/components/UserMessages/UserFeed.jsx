import { Link, useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";
import { Messages } from "../Messages";
import useUpdateSelectedAccount from "../../hooks/useUpdateSelectedAccount";
import useMessage from "../../hooks/useMessage";

export function UserFeed() {
  const {
    state: { userMessages, selectedUser },
    handleSelectUser,
  } = useAccountContext();
  const { receiverId } = useParams();

  const status = useMessage(receiverId, "FETCH_USERS_MESSAGE", "User");

  useUpdateSelectedAccount("selectedUser", "SELECTED_USER", receiverId);

  return (
    <div className=" h-full  bg-white   gap-4 text-2xl pl-6 md:pl-10 py-6 flex items-end">
      <div className="direct__message-chat flex flex-col ">
        <div>
          <div className="mb-12">
            <p>
              <Link
                to={`profile?id=${selectedUser?.id}`}
                onClick={handleSelectUser}
                className="flex items-center gap-4 mb-6"
              >
                {" "}
                <img
                  src={selectedUser?.image}
                  alt=""
                  className="w-[clamp(6rem,7vw,8rem)] h-[clamp(6rem,7vw,8rem)] rounded-lg"
                />
                <span className="text-3xl font-semibold relative">
                  {selectedUser?.name}
                  <i className="fa-solid fa-caret-right text-green-600 absolute right-[-1.4rem] top-1 rotate-45"></i>
                </span>
              </Link>
            </p>
            <p className="text-xl md:text-2xl mb-6">
              This conversation is just between{" "}
              <Link
                to={`profile?id=${selectedUser?.id}`}
                className="p-2 bg-blue-100 rounded-lg text-blue-700 hover:text-blue-900 hover:cursor-pointer hover:bg-blue-200"
                onClick={handleSelectUser}
              >
                @{selectedUser?.name}
              </Link>{" "}
              and you. Check out their profile to learn more about them.
            </p>
            <Link
              to={`profile?id=${selectedUser?.id}`}
              onClick={handleSelectUser}
              className="border border-gray-400 py-2 md:py-3 px-4 md:px-6 rounded-md text-xl"
            >
              View Profile
            </Link>
          </div>

          <Messages
            status={status}
            messageList={userMessages}
            url="profile?id="
          />
        </div>
      </div>
    </div>
  );
}
