import loading from "../../assets/loading.svg";

export function Loading({ width, height }) {
  return (
    <div className="spinner text-xl">
      <img src={loading} alt="loading" className={`w-${width} h-${height}`} />
      <span>Loading...</span>
    </div>
  );
}
