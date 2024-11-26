<script setup lang="ts">
// import RightBar from '../../components/tag/RightBar.vue';
import tagHeadBar from '@/features/community/components/tag/tagHeadBar.vue';
</script>

<template>
    <div>
        <tagHeadBar />
        <router-view />
        <!-- <RightBar /> -->
    </div>
</template>

<style scoped></style>