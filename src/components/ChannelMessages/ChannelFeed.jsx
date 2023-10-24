import { axiosFetch } from "../../api/api-get";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAccountContext } from "../../Context/AccountContext";
import profileLogo from "../../assets/profilelogo.png";
import { Link } from "react-router-dom";
import { Loading } from "../Loading";
import { ErrorMessage } from "../ErrorMessage";

export const ChannelFeed = () => {
  const { channelId } = useParams();
  const [status, setStatus] = useState("loading");
  const {
    state: { channelMessages, allChannels, accountLogIn },
    dispatch,
    handleSelectUser,
  } = useAccountContext();

  useEffect(() => {
    const fetchReceivedMessages = async () => {
      try {
        const res = await axiosFetch.get(
          `/messages?receiver_id=${channelId}&receiver_class=Channel`
        );
        const data = res.data.data;
        const senderAPIdata = data.map((msg) => ({
          ...msg,
          sender: {
            ...msg.sender,
            image: profileLogo,
            name: msg.sender.email.split("@")[0],
          },
        }));

        dispatch({ type: "FETCH_CHANNEL_MESSAGE", payload: senderAPIdata });
        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.log(error);
      }
    };
    fetchReceivedMessages();
  }, [dispatch, channelId]);

  const findChannel = allChannels.find((channel) => channel.id === +channelId);

  return (
    <div className=" h-full  bg-white   gap-4 text-2xl pl-12 py-6 flex items-end ">
      <div className="direct__message-chat flex flex-col  ">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            👋 Welcome to the <i className="fa-solid fa-hashtag"></i>{" "}
            {findChannel?.name} channel
          </h1>
          <p className="text-gray-600 mb-6">
            This channel is for everything{" "}
            <i className="fa-solid fa-hashtag"></i> {findChannel?.name}. Hold
            meetings, share docs, and make decisions together with your team.
          </p>
          <button
            className="py-2 px-6 border border-slate-400 rounded-md"
            onClick={() => {
              dispatch({
                type: "SHOW_MODAL",
                payload: { name: "isOpenAddUserForm", value: true },
              });
            }}
          >
            {" "}
            <i className="fa-solid fa-user-plus text-2xl  "></i>
            <span className="ml-2">Add coworker</span>
          </button>
        </div>

        {status === "loading" && <Loading font-size={"text-2xl"} />}
        {status === "error" && <ErrorMessage />}
        {status === "success" &&
          channelMessages?.map(({ body, sender, created_at }, i) => {
            const option = {
              hour: "numeric",
              minute: "numeric",
            };

            const date = new Intl.DateTimeFormat(
              navigator.language,
              option
            ).format(new Date(created_at));

            const { image, name, id } = sender;
            const checkAccountMessage = accountLogIn.id === id;
            return (
              <div
                key={i}
                className={checkAccountMessage ? "flex justify-end mr-6" : ""}
              >
                <div className="flex item-center gap-4 mb-4 w-1/2">
                  <img src={image} alt="" className="w-12 h-12 rounded-md" />
                  <p className="flex flex-col">
                    {" "}
                    <span className="flex items-center gap-2">
                      <Link
                        to={`${id}`}
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
              </div>
            );
          })}
      </div>
    </div>
  );
};
