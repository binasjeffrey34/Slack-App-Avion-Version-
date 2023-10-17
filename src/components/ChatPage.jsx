import { useState } from "react";
import { useAccountContext } from "../Context/AccountContext";
import { FormAddUser } from "./FormAddUser";

export function ChatPage() {
  const { dispatch } = useAccountContext();
  const [isOpenAddUser, setIsOpenAddUser] = useState(false);

  return (
    <section className="bg-white relative">
      <div className="absolute top-0 left-0 w-full text-gray-900 z-[1] border-b-[2px] flex justify-between items-center py-2 px-6">
        <button
          className="text-xl"
          onClick={() => {
            setIsOpenAddUser(true);
            dispatch({ type: "SHOW_MODALADDUSERFORM", payload: true });
          }}
        >
          Add User
        </button>
      </div>

      {isOpenAddUser && <FormAddUser setIsOpenAddUser={setIsOpenAddUser} />}
    </section>
  );
}
