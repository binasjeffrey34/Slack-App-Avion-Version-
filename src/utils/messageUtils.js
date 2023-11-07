export function messageUtils(data, allUsers) {
  const message = data.map((msg) => {
    const user = allUsers.find((user) => user.id === msg.sender.id);
    return user
      ? {
          ...msg,
          sender: {
            ...msg.sender,
            image: user.image,
            name: msg.sender.email.split("@")[0],
          },
        }
      : msg;
  });

  return message;
}
