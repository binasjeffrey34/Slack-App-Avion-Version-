export function InputError({ btmSize = "-1.8rem", lftSize = "0", children }) {
  return (
    <small
      className="text-lg text-red-500 absolute "
      style={{
        bottom: btmSize,
        left: lftSize,
      }}
    >
      {children}
    </small>
  );
}
