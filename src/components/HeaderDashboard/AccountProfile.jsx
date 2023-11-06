import { useAccountContext } from "../../Context/AccountContext";

export function AccountProfile() {
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
    <div className="absolute right-0 top-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center gap-4">
      <img src={account?.image} className="w-10 h-10 rounded-full" alt="" />
      <span className="text-2xl text-white font-medium">{account?.name}</span>
    </div>
  );
}
