import { defineStore } from "pinia";
import { useLocalStorageWithExpire } from '@/composables/useLocalStorage';

const { getLocalStorageWithExpire, setLocalStorageWithExpire } = useLocalStorageWithExpire();
export const applicationStore = defineStore("application", {
    state: () => ({
        countdown: 60,
        isRequesting: false,
    }),
    actions: {
        isGetCode() {
            const application = JSON.parse(localStorage.getItem('application'))
            // this.countdown = login ? JSON.parse(login) : {} || 60
            // console.log(login.countdown, login.isRequesting);
            if (!application) {
                return
            } else if (application.isRequesting && application.countdown > 0) {
                this.countdown = application.countdown
                const interval = setInterval(() => {
                    if (this.countdown > 0) {
                        this.countdown--
                    } else {
                        clearInterval(interval)
                        this.isRequesting = false
                    }
                }, 1000)
            }
            // this.isRequesting = login ? true : false
            // console.log(isRequesting, this.countdown);
        },
        startCountdown() {
            if (this.isRequesting) return  // 防止重复请求
            this.countdown = 60
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