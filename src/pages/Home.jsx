import { Link, Outlet } from "react-router-dom";
import homePageLogo from "../assets/homepageLogo.png";
import { useAccountContext } from "../Context/AccountContext";

export default function Home() {
  const {
    handleModal,
    state: { isOpenLink },
  } = useAccountContext();
  return (
    <main className={`${isOpenLink ? "overlay" : ""} min-h-screen `}>
      <header className="">
        <nav className="w-[clamp(30rem,90%,120rem)] mx-auto flex items-center  justify-between py-8">
          <div className="flex items-center  gap-6 md:gap-20">
            <i
              className="fa-solid fa-bars text-3xl cursor-pointer md:hidden"
              onClick={() => handleModal("isOpenLink", true)}
            ></i>
            <Link to="/">
              <img
                src={homePageLogo}
                alt="homelogo"
                className="w-[clamp(7rem,10vw,10rem)]"
              />
            </Link>

            <ul
              className={` absolute md:relative top-[22rem] md:top-0 left-1/2 md:left-0 w-[clamp(30rem,90%,50rem)]  translate-x-[-50%] translate-y-[-50%] z-50 rounded-md md:-translate-x-0 md:translate-y-0 flex  flex-col md:flex-row text-2xl selection:text-gray-600 font-medium gap-12 bg-white md:bg-transparent text-center md:text-left pt-24 pb-16 md:py-0 ${
                isOpenLink ? "left-0" : "left-[-100%]"
              }`}
            >
              <i
                className="fa-solid fa-xmark absolute top-10 right-10  text-3xl cursor-pointer md:hidden"
                onClick={() => handleModal("isOpenLink")}
              ></i>
              <a href="#">Why Slack?</a>
              <a href="#">Solutions</a>
              <a href="#">Resources</a>
              <a href="#">Pricing</a>
            </ul>
          </div>
          <div className="text-2xl md:text-2xl font-medium text-gray-600">
            <Link to="sign_in">Sign In</Link>
          </div>
        </nav>
      </header>

      <Outlet />
    </main>
  );
}
