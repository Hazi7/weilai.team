<script setup lang="ts">
import TagHeadBar from '@/features/community/components/tag/TagHeadBar.vue';
// import TagWordCloud from '../../components/tag/TagWordCloud.vue';
// import RightBar from '../../components/tag/RightBar.vue';
import { ref } from 'vue';
const type = ref(0)
</script>

<template>
    <div>
        <TagHeadBar :type="type"></TagHeadBar>
        <router-view />
        <!-- <RightBar /> -->
        <!-- <TagWordCloud></TagWordCloud> -->
    </div>
</template>

<style scoped></style>
