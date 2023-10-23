import loading from "../assets/loading.svg";

export function Loading({
  fontsize = "text-2xl",
  fonttext = "",
  w = 12,
  h = 12,
}) {
  return (
    <div className={`spinner ${fontsize} `}>
      <img src={loading} alt="loading" className={`w-${w} h-${h}`} />
      <span className={`${fonttext}`}>Loading...</span>
    </div>
  );
}
