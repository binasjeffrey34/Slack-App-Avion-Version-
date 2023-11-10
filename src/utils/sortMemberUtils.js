function sortMemberUtils(list, accountLogIn) {
  const sortMember = list.sort((a, b) =>
    a.id === accountLogIn.id ? -1 : b.id === accountLogIn.id ? 1 : 0
  );
  return sortMember;
}

export default sortMemberUtils;
