import { useAccountContext } from "../Context/AccountContext";

export function FormAddUser({ setIsOpenAddUser }) {
  const { onSetInput, state, dispatch } = useAccountContext();
  const { addUserInput } = state;
  function handleAddUser(e) {
    e.preventDefault();
  }

  return (
    <section className="absolute  top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-[0_0_1rem_rgba(0,0,0,0.1)] z-10 bg-white w-[50rem] h-[80vh] px-12 py-20 rounded-lg">
      <i
        className="fa-solid fa-xmark absolute top-4 right-6 text-2xl cursor-pointer"
        onClick={() => {
          setIsOpenAddUser(false);
          dispatch({ type: "SHOW_MODALADDUSERFORM", payload: false });
        }}
      ></i>
      <form
        onSubmit={handleAddUser}
        className="grid grid-cols-[2fr,1fr] gap-10 mb-12"
      >
        <div className="relative w-full">
          <input
            type="text"
            name="addUserInput"
            className={`border p-4 rounded-sm text-xl w-full `}
            placeholder="Add User"
            value={addUserInput}
            onChange={onSetInput}
          />
        </div>
        <button className="bg-blue-500 text-white text-xl py-4 px-6 rounded-md">
          Add User
        </button>
      </form>
    </section>
  );
}
