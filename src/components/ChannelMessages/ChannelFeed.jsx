import { axiosFetch } from "../../api/api-get";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAccountContext } from "../../Context/AccountContext";
import profileLogo from "../../assets/profilelogo.png";
import { Link } from "react-router-dom";

export const ChannelFeed = () => {
  const { channelId } = useParams();
  const {
    state: { receivedMessages },
    dispatch,
    handleSelectUser,
  } = useAccountContext();

  console.log(receivedMessages);
  console.log(channelId);

  useEffect(() => {
    const fetchReceivedMessages = async () => {
      try {
        const res = await axiosFetch.get(
          `/api/v1/messages?receiver_id=${channelId}&receiver_class=Channel`
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
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchReceivedMessages();
  }, [dispatch, channelId]);

  return (
    <div className="flex items-end p-8 text-xl">
      <div>
        {receivedMessages?.map(({ body, sender, created_at }, i) => {
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
};

{
  /* <div className={styles.sendertime}>
<div className={styles.sender}>{sender}</div>
<div className={styles.ttime}>{`${getDate(time)} ${getTime(
  time
)} GMT+8`}</div> */
}
