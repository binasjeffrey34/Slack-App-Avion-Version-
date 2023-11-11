import { useAccountContext } from "../Context/AccountContext";

function SendMessage({ onSubmit, name, inputVal }) {
  const { onSetInput, state, handleModalEmoji } = useAccountContext();

  return (
    <div data-testid="Send" className="bg-white  h-full">
      <div
        className={`w-[95%]  mx-auto bg-white border
    rounded-xl relative z-10 bottom-24 overflow-hidden ${
      state[inputVal].length > 0 ? "border-slate-500" : "border-slate-300"
    }`}
      >
        <div
          className={` text-2xl text-gray-300 bg-slate-50 flex items-center  p-4 mb-4 ${
            state[inputVal].length > 0 ? "text-gray-400" : "text-gray-300"
          }`}
        >
          <div className="py-1 pr-6 border-r-[1px] border-slate-300 flex items-center gap-10">
            <i className="fa-solid fa-b"></i>
            <i className="fa-solid fa-italic"></i>
            <i className="fa-solid fa-strikethrough"></i>
          </div>
          <div className="py-1 px-6 border-r-[1px] border-slate-300 flex items-center">
            <i className="fa-solid fa-link"></i>
          </div>
          <div className="py-1 px-6 border-r-[1px] border-slate-300 flex items-center gap-10">
            <i className="fa-solid fa-list-ol"></i>
            <i className="fa-solid fa-list-ul"></i>
          </div>
          <i className="fa-solid fa-ellipsis px-6"></i>
        </div>
        <form className="px-4 pb-4" onSubmit={onSubmit}>
          <input
            type="text"
            name={inputVal}
            placeholder={`Message ${name}`}
            className="w-full text-2xl p-4 rounded-md outline-none"
            value={state[inputVal]}
            onChange={onSetInput}
          />
          <div className="flex items-center justify-between">
            <div className=" text-3xl text-gray-500 flex items-center ">
              <div className="flex items-center gap-6 pr-6  border-r-[1px] border-slate-300">
                <i className="fa-solid fa-plus text-2xl font-medium py-2 px-4 rounded-full bg-slate-100"></i>
                <i className="fa-solid fa-a py-2 "></i>
                <i
                  className="fa-regular fa-face-smile py-2 hover:cursor-pointer  "
                  onClick={() => handleModalEmoji(`is${inputVal}`)}
                ></i>
                <i className="fa-solid fa-at py-2 "></i>
              </div>
              <div className="flex items-center gap-6 px-6 border-r-[1px] border-slate-300">
                <i className="fa-solid fa-video"></i>
                <i className="fa-solid fa-microphone py-2 "></i>
              </div>

              <div className="flex items-center  gap-6 px-6  relative">
                <i className="fa-regular fa-square py-2 text-4xl"></i>
                <i className="fa-solid fa-slash fa-rotate-90 py-2  absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rotate-90 font-bold text-sm"></i>
              </div>
            </div>

            <button
              type="submit"
              className={` text-gray-400 text-2xl  rounded-lg  flex items-center gap-6 py-4 px-4 transition-all ${
                state[inputVal].length > 0 ? "bg-emerald-700 text-white" : ""
              }`}
            >
              <i className="fa-regular fa-paper-plane rotate-[60deg] skew-x-3 skew-y-3 "></i>
              <i className="fa-solid fa-angle-down  text-xl px-4  border-l-[1px] border-slate-300 relative top-1"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendMessage;
