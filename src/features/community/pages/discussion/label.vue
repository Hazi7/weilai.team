<script setup lang="ts">
// import RightBar from './tag/RightBar.vue';
import tagHeadBar from '@/features/community/components/tag/tagHeadBar.vue';
</script>

<template>
    <div>
        <!-- <RightBar /> -->
        <tagHeadBar />
        <router-view />
    </div>
</template>

<style scoped></style>
<route lang="json">{
    "meta": {
        "title": "标签",
        "path": "/community/discussion/label/tag/:title"
    }
}</route>