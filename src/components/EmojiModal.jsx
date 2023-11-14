import { useAccountContext } from "../Context/AccountContext";
import { emoji } from "../utils/emoji";

export function EmojiModal({ inputEl }) {
  const { handleGetEmoji, handleModalEmoji } = useAccountContext();

  return (
    <div className=" w-[clamp(30rem,38vw,40rem)] h-[clamp(20rem,24vw,25rem)] absolute bottom-[20%] left-[2.5%] border border-slate-300  z-20 bg-slate-50 text-3xl md:text-4xl p-4 shadow-[0_5px_1rem_rgba(0,0,0,0.10)] rounded-xl overflow-hidden">
      <p className="text-xl md:text-2xl mb-4 font-medium text-gray-600 border-b-[1px] border-slate-300 pb-4">
        <span>Emoji</span>
        <i
          className="fa-solid fa-xmark absolute top-4 right-6 text-2xl md:text-3xl cursor-pointer"
          onClick={() => handleModalEmoji(`is${inputEl}`)}
        ></i>
      </p>
      <div className="emoji text-2xl md:text-3xl">
        {emoji.map((emo, i) => (
          <button
            key={i}
            onClick={() => handleGetEmoji(emo, inputEl)}
            className="p-4 hover:bg-slate-200 transition-all rounded-2xl"
          >
            {emo}
          </button>
        ))}
      </div>
    </div>
  );
}
