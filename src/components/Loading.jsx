import loading from "../assets/loading.svg";

export function Loading() {
  return (
    <div className={`spinner text-xl `}>
      <img src={loading} alt="loading" className=" w-10 h-10" />
      <span>Loading...</span>
    </div>
  );
}
