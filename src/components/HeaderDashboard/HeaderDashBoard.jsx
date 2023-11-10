import { HeaderSearch } from "./HeaderSearch";

export function HeaderDashBoard() {
  return (
    <section className="col-span-4 text-center py-2 relative h-[4.5vh] flex items-center justify-center">
      <HeaderSearch />
      <button className="text-3xl text-white absolute top-1/2 right-4 translate-x-[-50%] translate-y-[-50%]">
        <i className="fa-regular fa-circle-question"></i>
      </button>
    </section>
  );
}
