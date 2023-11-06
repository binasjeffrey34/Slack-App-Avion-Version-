export function ViewPassWord({ onSetOpen, isOpen }) {
  return (
    <i
      onClick={() => onSetOpen((open) => !open)}
      className={`text-gray-400 hover:cursor-pointer absolute right-10 top-1/2 translate-x-[-50%] translate-y-[-50%] text-xl ${
        isOpen ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
      }`}
    ></i>
  );
}
