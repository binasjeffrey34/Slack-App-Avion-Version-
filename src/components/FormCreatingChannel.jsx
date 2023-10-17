import { useAccountContext } from "../Context/AccountContext";

export function FormCreatingChannel({ setIsOpenChannel }) {
  const { state, onSetInput, dispatch } = useAccountContext();
  const { channelName } = state;

  function handleCreateChannel(e) {
    e.preventDefault();
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
          className={`border p-4 rounded-sm text-xl w-full `}
          placeholder="Create a new channel"
          value={channelName}
          onChange={onSetInput}
        />
      </div>

      <button className="bg-blue-500 text-white text-xl py-4 px-6 ml-4 rounded-md">
        Create Channel
      </button>
    </form>
  );
}
