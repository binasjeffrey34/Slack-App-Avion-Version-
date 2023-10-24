import { useAccountContext } from "../../Context/AccountContext";

export function HeaderSendingMessage() {
  const {
    state: {
      selectedUser: { name, image },
    },
  } = useAccountContext();

  return (
    <div className="absolute top-0 left-0 h-[5rem] w-full text-gray-900 z-[1] flex justify-between items-center px-6 text-3xl bg-white border-b-[1px] ">
      <p className=" font-medium flex items-center gap-4">
        <img src={image} alt="" className="w-10  h-10 rounded-md" />
        <span>{name}</span> <i className="fa-solid fa-angle-down text-xl"></i>
      </p>
      <div className="flex items-center gap-4 py-1 px-2 hover:cursor-pointer hover:bg-gray-100 rounded-md "></div>
    </div>
  );
}
