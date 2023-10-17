import { useAccountContext } from "../Context/AccountContext";

export function ProfilePage() {
  const { onSetInput } = useAccountContext();

  function handleSendMessage() {}

  return (
    <section className="bg-white shadow-[0_0_1rem_rgba(0,0,0,0.2)] relative">
      Profile Page
      <form method="post" onSubmit={handleSendMessage}>
        <input
          type="text"
          name="sendMessageInput"
          id=""
          className="text-xl border-2 w-full mt-10 p-2"
          placeholder={`Message to `}
          onChange={onSetInput}
        ></input>
        <button className="text-xl bg-blue-600 text-white px-12 py-4">
          {" "}
          Send
        </button>
      </form>
    </section>
  );
}
