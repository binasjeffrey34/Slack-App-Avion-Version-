export function MainPage({ account }) {
  const { fullName } = account;
  console.log(fullName);
  return <section>{fullName}</section>;
}
