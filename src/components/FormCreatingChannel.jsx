import { useAccountContext } from "../Context/AccountContext";

export function FormCreatingChannel({ setIsOpenChannel }) {
  const {
    state,
    onSetInput,
    checkError,
    validateInput,
    dispatch,
  } = useAccountContext();
  const { ischannelNameError, channelNameError, channelName, logInAccount } =
    state;

  function handleCreateChannel(e) {
    e.preventDefault();
    const field = "channelName";
    if (!channelName) {
      validateInput(field, "Can't be Empty");
      return;
    }
    if (
      logInAccount?.channelList
        .map((channel) => channel.channelName)
        .includes(channelName)
    ) {
      validateInput(field, "Channel already Exist");
      return;
    }
    dispatch({ type: "CREATE_CHANNEL" });
    setIsOpenChannel(false);
  }

  return (
    <form
      className="absolute top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%] z-10 shadow-[0_0_1rem_rgba(0,0,0,0.3)] h-[10rem] w-[40rem] items-center justify-center flex mx-auto bg-white"
      onSubmit={handleCreateChannel}
    >
      <i
        className="fa-solid fa-xmark absolute top-4 right-6 text-2xl cursor-pointer"
        onClick={() => {
          setIsOpenChannel(false);
          dispatch({ type: "SHOW_MODALCHANNELFORM", payload: false });
        }}
      ></i>
      <div className="relative">
        <input
          type="text"
          name="channelName"
          className={`border p-4 rounded-sm text-xl w-full ${checkError(
            ischannelNameError
          )}`}
          placeholder="Create a new channel"
          value={channelName}
          onChange={onSetInput}
        />
        {ischannelNameError && (
          <small className="text-lg text-red-500 absolute top-16 left-0 z-10">
            {channelNameError}
          </small>
        )}
      </div>

      <button className="bg-blue-500 text-white text-xl py-4 px-6 ml-4 rounded-md">
        Create Channel
      </button>
    </form>
  );
}
