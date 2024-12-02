<script setup lang="ts">
import Alert from '@/components/login/Alert.vue'
import { inject } from 'vue';
import { useAlert } from './composables/alert';

const { alertState } = useAlert();
</script>

<template>
    <!-- 全局提示框 -->
    <Alert v-if="alertState" :alertState="alertState" :message="alertState.message" :type="alertState.type" />
    <RouterView></RouterView>
</template>