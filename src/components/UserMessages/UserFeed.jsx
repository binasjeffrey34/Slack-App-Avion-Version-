import { Link, useParams } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";
import { Messages } from "../Messages";
import useUpdateSelectedAccount from "../../hooks/useUpdateSelectedAccount";

export function UserFeed({ status }) {
  const {
    state: {
      userMessages,
      selectedUser: { id, image, name },
    },
    handleSelectUser,
  } = useAccountContext();
  const { receiverId } = useParams();

  useUpdateSelectedAccount("selectedUser", "SELECTED_USER", receiverId);

  return (
    <div className=" h-full  bg-white   gap-4 text-2xl pl-12 py-6 flex items-end">
      <div className="direct__message-chat flex flex-col justify-end ">
        <div>
          <div className="mb-12">
            <p>
              <Link
                to={`profile?id=${id}`}
                onClick={handleSelectUser}
                className="flex items-center gap-4 mb-6"
              >
                {" "}
                <img
                  src={image}
                  alt=""
                  className="w-[10rem] h-[10rem] rounded-lg"
                />
                <span className="text-3xl font-semibold relative">
                  {name}
                  <i className="fa-solid fa-caret-right text-green-600 absolute right-[-1.4rem] top-1 rotate-45"></i>
                </span>
              </Link>
            </p>
            <p className="text-[1.6rem] mb-6">
              This conversation is just between{" "}
              <Link
                to={`profile?id=${id}`}
                className="p-2 bg-blue-100 rounded-lg text-blue-700 hover:text-blue-900 hover:cursor-pointer hover:bg-blue-200"
                onClick={handleSelectUser}
              >
                @{name}
              </Link>{" "}
              and you. Check out their profile to learn more about them.
            </p>
            <Link
              to={`profile?id=${id}`}
              onClick={handleSelectUser}
              className="border border-gray-400 p-3 px-6 rounded-md"
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
