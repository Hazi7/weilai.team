import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  // 定义初始状态
  state: () => ({
    userId: 0,
    isSelf: true,
  }),

  actions: {
    // 存储id
    setUserId(id: number) {
      this.userId = id;
    },
    setIsSelf(self: boolean) {
      this.isSelf = self;
    },
    reset() {
      this.userId = 0;
      this.isSelf = true;
    },
  },
  getters: {
    getUserId: (state) => state.userId,
    getIsSelf: (state) => state.isSelf,
  },
  persist: {
    key: "userStore",
    storage: localStorage,
  },
});
