import { defineStore } from "pinia";
export const useNoticeStore = defineStore("notice", {
  state: () => ({
    hasUnreadNotice: false,
  }),
  actions: {
    setHasUnreadNotice(newValue: boolean) {
      this.hasUnreadNotice = newValue;
    },
  },
});
