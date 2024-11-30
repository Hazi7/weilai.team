<script setup lang="ts">
import TagHeadBar from '@/features/community/components/tag/TagHeadBar.vue';

// import RightBar from '../../components/tag/RightBar.vue';
</script>

<template>
    <div>
        <TagHeadBar></TagHeadBar>
        <router-view />
        <!-- <RightBar /> -->
    </div>
</template>

<style scoped></style>
