import { useAccountContext } from "../Context/AccountContext";

export function FormAddUser({ setIsOpenAddUser }) {
  const { checkError, onSetInput, state, validateInput, dispatch } =
    useAccountContext();

  const { isuserError, userError, user, accountList, logInAccount } = state;

  function handleAddUser(e) {
    e.preventDefault();
    const field = "user";
    const checkUserIfExist = accountList
      .map((acc) => acc.fullName.split(" ")[0].toLowerCase())
      .includes(user.toLowerCase());

    if (!user) {
      validateInput(field, "Can't be Empty");
      return;
    }
    if (!checkUserIfExist) {
      validateInput(field, "user does not exist");
      return;
    }
    if (
      logInAccount?.selectedChannel.userAddedAccount
        .map((user) => user.fullName.split(" ")[0].toLowerCase())
        .includes(user.toLowerCase())
    ) {
      validateInput(field, "user already exist");
      return;
    }

    dispatch({ type: "ADD_USER" });
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
            name="user"
            className={`border p-4 rounded-sm text-xl w-full ${checkError(
              isuserError
            )}`}
            placeholder="Add User"
            value={user}
            onChange={onSetInput}
          />
          {isuserError && (
            <small className="text-lg text-red-500 absolute top-16 left-0 z-10">
              {userError}
            </small>
          )}
        </div>
        <button className="bg-blue-500 text-white text-xl py-4 px-6 rounded-md">
          Add User
        </button>
      </form>
      <ul>
        {logInAccount.selectedChannel?.userAddedAccount.map(
          ({ fullName, id }) => (
            <li key={id} className="text-2xl mb-2 border-b-[1px] py-4">
              {fullName}
            </li>
          )
        )}
      </ul>
    </section>
  );
}
