import { useAccountContext } from "../Context/AccountContext";

export function InputElement({ type, field, isError, holderInfo }) {
  const { state, inputStyle, onSetInput } = useAccountContext();
  return (
    <input
      type={type}
      name={field}
      value={state[field]}
      className={inputStyle(isError)}
      placeholder={holderInfo}
      onChange={onSetInput}
    />
  );
}
