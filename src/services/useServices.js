import { axiosFetch } from "../api/api-get";
import { messageUtils } from "../utils/messageUtils";

export const useServices = {
  getMessages: async (allUsers, id, classType) => {
    try {
      const res = await axiosFetch.get(
        `/messages?receiver_id=${id}&receiver_class=${classType}`
      );

      const { data } = res.data;
      const messageData = messageUtils(data, allUsers);

      return messageData;
    } catch (error) {
      console.log(`Fetch Error: ${error}`);
    }
  },
  getChannelMembers: async (allUsers, id) => {
    try {
      const res = await axiosFetch.get(`/channels/${id}`);
      const allMember = res.data?.data?.channel_members;

      const getAllMember = allUsers.filter((user) =>
        allMember.some((userchannel) => user.id === userchannel.user_id)
      );

      return getAllMember;
    } catch (error) {
      console.log(`Fetch Error: ${error}`);
    }
  },
};
