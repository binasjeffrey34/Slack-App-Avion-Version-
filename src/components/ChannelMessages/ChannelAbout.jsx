import { useState } from "react";

function ChannelAbout() {
  const [isEditingTopic, setIsEditingTopic] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [topic, setTopic] = useState("Initial Topic");
  const [description, setDescription] = useState("Initial Description");
  // const { userId, channelId } = useParams();

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
            <h3 className="about-item-title text-2xl">Topic</h3>
            {isEditingTopic ? (
              <div>
                <input
                  className="border p-4 pl-16 rounded-lg text-2xl w-full font-medium"
                  type="text"
                  value={topic}
                  onChange={(e) => handleInputChange("topic", e)}
                />
                <button
                  className="about-channel-save-button pt-4 pb-4"
                  onClick={() => handleSaveClick("topic")}
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                className="border p-4 pl-16 rounded-lg text-2xl w-full font-medium"
                onClick={() => handleEditClick("topic")}
              >
                {topic}
              </div>
            )}
          </div>
        </li>
        <li className="about-channel-list-item">
          <div className="about-channel-list-item-top">
            <h3 className="about-item-title pt-16 text-2xl">Description</h3>
            {isEditingDescription ? (
              <div>
                <textarea
                  value={description}
                  onChange={(e) => handleInputChange("description", e)}
                  className="border p-4 pl-16 rounded-lg text-2xl w-full font-medium"
                />
                <button
                  className="about-channel-save-button pt-4 pb-4"
                  onClick={() => handleSaveClick("description")}
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                className="border p-4 pl-16 rounded-lg text-2xl w-full font-medium"
                onClick={() => handleEditClick("description")}
              >
                {description}
              </div>
            )}
          </div>
        </li>
        <li className="about-channel-list-item">
          <div className="about-channel-list-item-top">
            <h3 className="about-item-title pt-16 text-2xl">Created By</h3>
          </div>
          {/* <span className="about-item-detail">{`${ownerId} on ${createdAt}`}</span> */}
        </li>
        <li className="channel-files-container">
          <div className="channel-files">
            <h3 className="channel-files-title pt-16 text-2xl">
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
