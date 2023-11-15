import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <p className="h-screen flex items-center justify-center flex-col gap-4 text-4xl font-bold">
      <span>Page not Found !</span>
      <span
        className="underline text-blue-600 font-medium cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Go Back
      </span>
    </p>
  );
}
