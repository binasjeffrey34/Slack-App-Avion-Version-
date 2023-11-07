import { useState } from "react";

function ChannelAbout() {
  const [isEditingTopic, setIsEditingTopic] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [topic, setTopic] = useState("Initial Topic");
  const [description, setDescription] = useState("Initial Description");

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
    <ul className="about-channel-container px-12 pt-8">
      <li className="about-channel-list-item">
        <div className="about-channel-list-item-top">
          <h3 className="about-item-title">Topic</h3>
          {isEditingTopic ? (
            <div>
              <input
                type="text"
                value={topic}
                onChange={(e) => handleInputChange("topic", e)}
              />
              <button
                className="about-channel-save-button"
                onClick={() => handleSaveClick("topic")}
              >
                Save
              </button>
            </div>
          ) : (
            <button
              className="about-channel-edit-button"
              onClick={() => handleEditClick("topic")}
            >
              Edit
            </button>
          )}
        </div>
        <span className="about-item-detail">{isEditingTopic ? "" : topic}</span>
      </li>
      <li className="about-channel-list-item">
        <div className="about-channel-list-item-top">
          <h3 className="about-item-title">Description</h3>
          {isEditingDescription ? (
            <div>
              <textarea
                value={description}
                onChange={(e) => handleInputChange("description", e)}
              />
              <button
                className="about-channel-save-button"
                onClick={() => handleSaveClick("description")}
              >
                Save
              </button>
            </div>
          ) : (
            <button
              className="about-channel-edit-button"
              onClick={() => handleEditClick("description")}
            >
              Edit
            </button>
          )}
        </div>
        <span className="about-item-detail">
          {isEditingDescription ? "" : description}
        </span>
      </li>
      <li className="about-channel-list-item">
        <div className="about-channel-list-item-top">
          <h3 className="about-item-title">Created By</h3>
        </div>
        {/* <span className="about-item-detail">{`${ownerId} on ${createdAt}`}</span> */}
      </li>
      <li className="channel-files-container">
        <div className="channel-files">
          <h3 className="channel-files-title">Channel Files</h3>
        </div>
        {/* <span className="channel-files-list">{channelFiles}</span> */}
      </li>
    </ul>
  );
}

export default ChannelAbout;
