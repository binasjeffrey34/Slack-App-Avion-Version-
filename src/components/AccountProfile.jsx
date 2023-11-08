import { useAccountContext } from "../Context/AccountContext";

export function AccountProfile({ onSetOpenProfile }) {
  const {
    state: { accountLogIn, allUsers },
  } = useAccountContext();

  const findAccount = allUsers.find((user) => user.id === accountLogIn.id);
  const account = findAccount && {
    ...accountLogIn,
    image: findAccount.image,
    name: accountLogIn.email.split("@")[0],
  };

  return (
    <section className="flex flex-col items-center gap-6 relative bottom-[-2rem]">
      <p>
        <i className="fa-solid fa-plus font-medium py-3 px-4 rounded-full bg-[rgba(255,255,255,0.3)]"></i>
      </p>
      <div
        className=" flex items-center gap-4 w-16 h-16 relative cursor-pointer"
        onClick={() => onSetOpenProfile((open) => !open)}
      >
        <img
          src={account?.image}
          className=" w-full h-full rounded-xl"
          alt=""
        />
        <i className="fa-solid fa-caret-right text-green-600 absolute bottom-[-8.5px] right-[-1px] rotate-45 text-4xl"></i>
      </div>
    </section>
  );
}
