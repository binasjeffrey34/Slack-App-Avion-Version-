export function Header() {
  return (
    <section className="col-span-4 text-center py-2">
      <div>
        <input
          type="search"
          name="inputSearch"
          className="search__bar w-1/4 py-2 px-4 rounded-lg bg-[rgba(255,255,255,0.3)] text-white text-xl"
          placeholder="Search"
        />
      </div>
    </section>
  );
}
