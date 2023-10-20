import { Link } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";

export function ChatSendingMessage() {
  const {
    state: {
      selectedUser: { messages, name, image, id },
    },
    dispatch,
  } = useAccountContext();
  function handleSelectUser() {
    dispatch({
      type: "SHOW_MODAL",
      payload: { name: "isDirectMessageOpen", value: true },
    });
  }

  return (
    <div className=" h-full  bg-white   gap-4 text-2xl pl-12 py-6 flex items-end">
      <div className="direct__message-chat flex  flex-col  ">
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
        {messages?.map(({ body, sender, created_at }, i) => {
          const option = {
            hour: "numeric",
            minute: "numeric",
          };

          const date = new Intl.DateTimeFormat(
            navigator.language,
            option
          ).format(new Date(created_at));

          const { id, image, name } = sender;
          return (
            <div key={i} className="flex item-center gap-4 mb-4">
              <img src={image} alt="" className="w-12 h-12 rounded-md" />
              <p className="flex flex-col">
                {" "}
                <span className="flex items-center gap-2">
                  <Link
                    to={`profile?id=${id}`}
                    onClick={handleSelectUser}
                    className="text-3xl font-bold mb-2"
                  >
                    {name}
                  </Link>
                  <small className="text-xl tracking-[1px]">{date}</small>
                </span>
                <span>{body}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}