export function HeaderSearch() {
  return (
    <div className="w-[80rem] mx-auto relative flex items-center justify-center gap-4">
      <i className="fa-regular fa-clock  text-white text-3xl"></i>
      <input
        type="search"
        name="inputSearch"
        className="search__bar w-full py-2 px-4 rounded-lg bg-[rgba(255,255,255,0.3)] text-white text-xl"
        placeholder="Search"
      />
      <i className="fa-solid fa-magnifying-glass absolute top-1/2 right-2 translate-x-[-50%] translate-y-[-50%] text-xl text-gray-300 "></i>
    </div>
  );
}
