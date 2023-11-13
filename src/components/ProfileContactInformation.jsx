import { Link, useParams } from "react-router-dom";
import { useAccountContext } from "../Context/AccountContext";

export function ProfileContactInformation({
  option,
  url,
  selectedAcc,
  selectedProf,
  endpoint = "",
}) {
  const { state, handleModal } = useAccountContext();
  const { allChannels, accountLogIn } = state;
  const { channelId } = useParams();
  const findChannel = allChannels.find((channel) => channel.id === +channelId);
  return (
    <div className="p-8 text-lg md:text-xl">
      <Info>
        <ContactInfo>Display name</ContactInfo>
        <span className="text-xl md:text-2xl font-mediun ">
          {selectedProf?.name}
        </span>
      </Info>
      <Info>
        <ContactInfo>Local time</ContactInfo>
        <span className="text-xl md:text-2xl font-mediun ">
          {new Intl.DateTimeFormat(navigator.language, option).format(
            new Date()
          )}
        </span>
      </Info>
      <Info>
        <ContactInfo> Email Address</ContactInfo>
        <Link
          href="#"
          className="hover:underline hover:cursor-pointertext-xl md:text-2xl text-blue-600"
        >
          {selectedProf?.email}
        </Link>
      </Info>

      <Info>
        <ContactInfo> Invited By</ContactInfo>
        <Link
          to={`${url}/${findChannel.id}/${selectedAcc}/${endpoint}`}
          className="text-blue-600 text-xl md:text-2xl font-medium py-1 px-1 bg-blue-50 rounded-md hover:bg-blue-100"
        >
          @{accountLogIn.name}
        </Link>
      </Info>
      <Info>
        <ContactInfo> Channels</ContactInfo>
        <Link
          to={`/dashboard/${findChannel.id}`}
          className="text-blue-600 text-xl md:text-2xl"
          onClick={() => handleModal("isProfileOpen", false)}
        >
          <i className="fa-solid fa-hashtag"></i>
          {findChannel.name}
        </Link>
      </Info>
    </div>
  );
}

function Info({ children }) {
  return <p className="mb-4">{children}</p>;
}

function ContactInfo({ children }) {
  return (
    <span className="block text-gray-500 font-medium mb-1">{children}</span>
  );
}
