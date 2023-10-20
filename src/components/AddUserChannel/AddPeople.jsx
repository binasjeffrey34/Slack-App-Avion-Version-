import { useAccountContext } from "../../Context/AccountContext";

export function AddPeople() {
  const { dispatch } = useAccountContext();
  return (
    <div
      className="text-2xl flex  items-center gap-4 mb-6 font-bold hover:cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
      onClick={() => {
        dispatch({
          type: "SHOW_MODAL",
          payload: { name: "isOpenAddUserForm", value: true },
        });
      }}
    >
      <i className="fa-solid fa-user-plus text-3xl p-2 bg-[#1d9bd11a] rounded-md text-slate-900"></i>
      <span>Add People</span>
    </div>
  );
}