import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  // 定义初始状态
  state: () => ({
    userId: 0,
  }),

  actions: {
    // 存储id
    setUserId(id: number) {
      this.userId = id;
    },
  },
  getters: {
    getUserId: (state) => state.userId,
  },
});
