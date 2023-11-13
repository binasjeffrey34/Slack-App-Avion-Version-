import { useState } from "react";
import { useAccountContext } from "../../Context/AccountContext";
import { useParams } from "react-router-dom";

function ChannelAbout() {
  const [isEditingTopic, setIsEditingTopic] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [topic, setTopic] = useState("Add a topic");
  const [description, setDescription] = useState("Add a description");
  const { channelId } = useParams();
  const {
    state: { accountLogIn, allChannels },
  } = useAccountContext();

  const option = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const getChannel = allChannels.find((channel) => channel.id === +channelId);
  const date = new Date(getChannel?.created_at);
  const newDate = new Intl.DateTimeFormat(navigator.language, option).format(
    date
  );

  const handleEditClick = (field) => {
    if (field === "topic") {
      setIsEditingTopic(true);
    } else if (field === "description") {
      setIsEditingDescription(true);
    }
  };

  const handleSaveClick = (field) => {
    if (field === "topic") {
      setIsEditingTopic(false);
    } else if (field === "description") {
      setIsEditingDescription(false);
    }
  };

  const handleInputChange = (field, event) => {
    const value = event.target.value;
    if (field === "topic") {
      setTopic(value);
    } else if (field === "description") {
      setDescription(value);
    }
  };

  return (
    <div className="about-channel-container px-12 pt-8">
      <ul className="about-channel-unlist-item">
        <li className="about-channel-list-item">
          <div className="about-channel-list-item-top">
            <h3 className="about-item-title text-2xl md:text-3xl font-medium mb-2 text-gray-700">
              Topic
            </h3>
            {isEditingTopic ? (
              <div>
                <input
                  className="border border-slate-400 p-4 rounded-lg text-xl md:text-2xl w-full mb-4"
                  type="text"
                  value={topic}
                  onChange={(e) => handleInputChange("topic", e)}
                />
                <button
                  className="about-channel-save-button pt-4 pb-4 bg-fuchsia-950 px-12 py-3 text-white rounded-md"
                  onClick={() => handleSaveClick("topic")}
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                className="border p-4 rounded-lg text-xl md:text-2xl w-full"
                onClick={() => handleEditClick("topic")}
              >
                {topic}
              </div>
            )}
          </div>
        </li>
        <li className="about-channel-list-item">
          <div className="about-channel-list-item-top">
            <h3 className="about-item-title pt-8 text-2xl md:text-3xl  font-medium mb-2 text-gray-700">
              Description
            </h3>
            {isEditingDescription ? (
              <div>
                <textarea
                  value={description}
                  onChange={(e) => handleInputChange("description", e)}
                  cols={1}
                  rows={1}
                  className="border p-4 rounded-lg text-xl md:text-2xl w-full outline-blue-400 mb-2"
                />
                <button
                  className="about-channel-save-button pt-4 pb-4 bg-fuchsia-950 px-12 py-3 text-white rounded-md"
                  onClick={() => handleSaveClick("description")}
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                className="border p-4 rounded-lg text-xl md:text-2xl w-full"
                onClick={() => handleEditClick("description")}
              >
                {description}
              </div>
            )}
          </div>
        </li>
        <li className="about-channel-list-item">
          <div className="about-channel-list-item-top">
            <h3 className="about-item-title pt-10 text-2xl md:text-3xl  font-medium mb-2 text-gray-700">
              Created By
            </h3>
          </div>
          <div className="about-item-detail">
            <span className="text-xl md:text-2xl">{accountLogIn?.name}</span>
            <span className="text-xl md:text-2xl">{` on ${newDate}`}</span>
            <span></span>
          </div>
        </li>
        <li className="channel-files-container">
          <div className="channel-files">
            <h3 className="channel-files-title pt-10 text-xl md:text-2xl font-medium">
              Channel Files
            </h3>
          </div>
          {/* <span className="channel-files-list">{channelFiles}</span> */}
        </li>
      </ul>
    </div>
  );
}

export default ChannelAbout;
