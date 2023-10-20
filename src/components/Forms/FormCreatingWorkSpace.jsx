import { useNavigate } from "react-router-dom";
import { useAccountContext } from "../../Context/AccountContext";

export function FormCreatingWorkSpace() {
  const {
    dispatch,
    state: { workSpaceInput },
    onSetInput,
  } = useAccountContext();
  const navigate = useNavigate();

  function handleCreateWorkSpace(e) {
    e.preventDefault();
    localStorage.setItem("workSpaceName", JSON.stringify(workSpaceInput));
    dispatch({ type: "CREATE_WORK_SPACE", payload: workSpaceInput });

    dispatch({
      type: "SHOW_MODAL",
      payload: { name: "isOpenWorkSpace", value: false },
    });
    navigate("/createChannel");
  }
  return (
    <>
      <form
        className="absolute top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%] z-10 shadow-[0_0_1rem_rgba(0,0,0,0.3)]  w-[40rem]  justify-center flex flex-col gap-6 mx-auto bg-white px-12 pt-20 pb-12 rounded-md"
        onSubmit={handleCreateWorkSpace}
      >
        <h1 className="text-3xl font-bold mb-4">Create a WorkSpace</h1>
        <div className="relative w-full">
          <input
            type="text"
            name="workSpaceInput"
            className={`border border-slate-300 p-4 rounded-sm text-xl w-full `}
            placeholder="WorkSpace Name"
            value={workSpaceInput}
            onChange={onSetInput}
          />
        </div>
        <div className="text-right">
          <button className="bg-blue-500 text-white text-xl py-4 px-6 rounded-md">
            Create WorkPlace
          </button>
        </div>
      </form>
    </>
  );
}
