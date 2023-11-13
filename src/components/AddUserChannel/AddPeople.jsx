import { useAccountContext } from "../../Context/AccountContext";

export function AddPeople() {
  const { handleModal } = useAccountContext();
  return (
    <div
      className="text-xl md:text-2xl flex  items-center gap-4  font-bold hover:cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
      role="openFormAddUser"
      onClick={() => handleModal("isOpenAddUserForm", true)}
    >
      <i className="fa-solid fa-user-plus text-2xl md:text-3xl p-2 bg-[#1d9bd11a] rounded-md text-slate-900"></i>
      <span>Add People</span>
    </div>
  );
}
