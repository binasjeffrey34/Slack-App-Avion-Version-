import loading from "../assets/loading.svg";
function SpinnerFullPage() {
  return (
    <div className="min-h-screen text-2xl flex items-center justify-center bg-slate-50">
      <div className="spinner">
        <img src={loading} alt="loading" className=" w-20 h-20" />
      </div>
    </div>
  );
}

export default SpinnerFullPage;
