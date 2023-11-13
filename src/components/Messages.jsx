import { Link } from "react-router-dom";
import { useAccountContext } from "../Context/AccountContext";
import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";

export function Messages({ status, messageList, url = "" }) {
  const {
    state: { accountLogIn },
    handleModal,
  } = useAccountContext();

  let prevDateText = null;

  return (
    <>
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorMessage />}
      {status === "success" &&
        (messageList.length > 0 ? (
          messageList.map(({ body, sender, created_at }, i) => {
            const option = {
              hour: "numeric",
              minute: "numeric",
            };
            const createdDate = new Date(created_at);
            const createTime = new Intl.DateTimeFormat(
              navigator.language,
              option
            ).format(createdDate);

            const diffInDays = Math.floor(
              (new Date() - createdDate) / (1000 * 60 * 60 * 24)
            );

            let dateText;
            if (diffInDays <= 0) {
              dateText = "Today";
            } else if (diffInDays === 1) {
              dateText = "Yesterday";
            } else {
              const daysOfWeek = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ];

              dateText = `${
                daysOfWeek[createdDate.getDay()]
              } ${createdDate.toLocaleString("default", {
                month: "long",
              })} ${createdDate.getDate()}`;
            }
            const showDateText = prevDateText !== dateText;
            prevDateText = dateText;

            const { id, image, name } = sender;
            const checkAccountMessage = accountLogIn.id === id;

            return (
              <div
                key={i}
                className={`relative z-[1]  ${
                  checkAccountMessage ? "flex justify-end mr-6" : ""
                } ${showDateText ? "mt-32" : ""}`}
              >
                {showDateText && (
                  <div className="date__text">
                    <p className=" bg-white absolute top-[-80%] left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 border border-slate-300 text-gray-500 rounded-full py-2 w-[clamp(17rem,18vw,18rem)] px-4 md:px-6 text-lg md:text-xl font-bold flex item-center justify-evenly">
                      <span>{dateText}</span>
                      <i className="fa-solid fa-angle-down text-lg text-gray-500 relative top-1"></i>
                    </p>
                  </div>
                )}

                <div className="flex item-center gap-4 mb-4 w-full md:w-1/2">
                  <img
                    src={image}
                    alt=""
                    className="w-10 md:w-12 h-10 md:h-12 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.15)]"
                  />
                  <p className="flex flex-col">
                    {" "}
                    <span className="flex items-center gap-2">
                      <Link
                        to={`${url}${id}`}
                        onClick={() => {
                          handleModal("isDirectMessageOpen", true);
                        }}
                        className="text-2xl md:text-3xl font-bold mb-2"
                      >
                        {name}{" "}
                        <span className="text-gray-400 font-normal text-xl md:text-2xl">
                          {accountLogIn.id === id ? "(you)" : ""}{" "}
                        </span>
                      </Link>
                      <small className="text-xl tracking-[1px]">
                        {createTime}
                      </small>
                    </span>
                    <span>{body}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="h-[36vh] flex items-center justify-center text-2xl font-medium text-gray-300">
            Send a Message
          </p>
        ))}
    </>
  );
}
