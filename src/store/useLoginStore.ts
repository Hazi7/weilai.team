import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
    state: () => ({
        countdown: 60,
        isRequesting: false,
    }),
    actions: {
        startCountdown() {
            this.countdown = 60
            if (this.isRequesting) return  // 防止重复请求
            this.isRequesting = true
            const interval = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--
                } else {
                    clearInterval(interval)
                    this.isRequesting = false
                }
            }, 1000)
        }
    },
    // 手动重置倒计时
    resetCountdown() {
        this.countdown = 60
        this.isRequesting = false
    },
    persist: true,
});