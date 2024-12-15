import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", {
  state: () => ({
    likeStatus: false,
    commentStatus: false,
    notificationStatus: false,
    // 总状态，根据三个分状态来确定其值
    hasNewMessage: false,
  }),
  actions: {
    setLikeStatus(newValue: boolean) {
      this.likeStatus = newValue;
      this.updateHasNewMessage();
    },
    setCommentStatus(newValue: boolean) {
      this.commentStatus = newValue;
      this.updateHasNewMessage();
    },
    setNotificationStatus(newValue: boolean) {
      this.notificationStatus = newValue;
      this.updateHasNewMessage();
    },
    updateHasNewMessage() {
      this.hasNewMessage =
        this.likeStatus || this.commentStatus || this.notificationStatus;
    },
  },
});
