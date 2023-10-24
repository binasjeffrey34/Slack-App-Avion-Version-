import { useAccountContext } from "../Context/AccountContext";
import { ErrorMessage } from "./ErrorMessage";
import { Loading } from "./Loading";

export function Header({ status }) {
  const {
    state: { accountLogIn, allUsers },
  } = useAccountContext();
  const findAccount = allUsers.find((user) => user.id === accountLogIn.id);

  return (
    <section className="col-span-4 text-center py-2 relative">
      <div>
        <input
          type="search"
          name="inputSearch"
          className="search__bar w-1/4 py-2 px-4 rounded-lg bg-[rgba(255,255,255,0.3)] text-white text-xl"
          placeholder="Search"
        />
      </div>
      <div className="absolute right-0 top-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center gap-4">
        {status === "loading" && (
          <Loading fontsize={"text-lg"} fonttext={"text-white"} w={8} h={8} />
        )}
        {status === "error" && <ErrorMessage />}
        {status === "success" && (
          <>
            <img
              src={findAccount?.image}
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <span className="text-2xl text-white font-medium">
              {findAccount?.name}
            </span>
          </>
        )}
      </div>
    </section>
  );
}
