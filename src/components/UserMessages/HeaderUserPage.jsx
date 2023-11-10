import { useAccountContext } from "../../Context/AccountContext";

export function HeaderUserPage() {
  const {
    state: {
      selectedUser: { name, image },
    },
  } = useAccountContext();

  return (
    <div className="absolute top-0 left-0 h-[5rem] w-full text-gray-900 z-[1] flex justify-between items-center px-6 text-3xl bg-white border-b-[1px] ">
      <p className=" font-medium flex items-center gap-4">
        <img src={image} alt="" className="w-12  h-12 rounded-md" />
        <span>{name}</span> <i className="fa-solid fa-angle-down text-xl"></i>
      </p>
      <div className="flex items-center gap-4 py-1 px-2 hover:cursor-pointer hover:bg-gray-100 rounded-md "></div>
      <div className="flex items-center gap-3">
        <div className="text-gray-600 px-3 h-14 rounded-2xl border flex items-center gap-2 justify-end">
          <i className="fa-solid fa-headphones-simple border-r-[1px] border-slate-300 pr-4"></i>

          <i className="fa-solid fa-angle-down ml-2 text-xl relative top-1 "></i>
        </div>

        <div className="px-3 h-14 flex items-center  rounded-2xl border ">
          <i className="fa-regular fa-note-sticky "></i>
        </div>
      </div>
    </div>
  );
}
