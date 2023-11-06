import { AccountProfile } from "./AccountProfile";
import { HeaderSearch } from "./HeaderSearch";

export function HeaderDashBoard() {
  return (
    <section className="col-span-4 text-center py-2 relative">
      <HeaderSearch />
      <AccountProfile />
    </section>
  );
}
