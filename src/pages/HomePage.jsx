import homePageImage from "../assets/homepageImage.jpg";

export default function HomePage() {
  return (
    <section className="w-[clamp(30rem,90%,120rem)]  mx-auto  grid place-items-center grid-cols-1 md:grid-cols-2 pt-12 md:pt-20 gap-12 ">
      <div className="w-full">
        <img
          src={homePageImage}
          alt=""
          className="w-full h-[clamp(42rem,50vw,55rem)]"
        />
      </div>
      <div className="text-2xl">
        <h1 className="text-6xl lg:text-8xl font-bold mb-12">
          Where Work Happens
        </h1>
        <p className="font-medium text-gray-600 leading-[2] mb-8">
          When your team needs to kick off a project, hire a new employee,
          deploy some code, review a sales contract, finalize next year&apos;s
          budget, measure an A/B test, plan your next office opening, and more,
          Slack has a covered.
        </p>
        <button className="bg-blue-900 text-yellow-50 py-4 px-12 rounded-md uppercase font-medium mb-10 md:mb-0">
          Get Started
        </button>
      </div>
    </section>
  );
}
