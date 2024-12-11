import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', {
    state: () => ({
        hasNewMessage: false
    }),
    actions: {
        setHasNewMessage(newValue: boolean) {
            this.hasNewMessage = newValue;
        }
    }
});
