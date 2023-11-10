function removeDuplicateMessage(data) {
  const uniqueMessage = [...new Set(data.map((item) => item.id))].map((id) =>
    data.find((item) => item.id === id)
  );
  return uniqueMessage;
}

export default removeDuplicateMessage;
