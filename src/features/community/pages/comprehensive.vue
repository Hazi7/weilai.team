<script setup lang="ts">
import TheTopNav from "@/components/layouts/AppThirdNav.vue";
import { useTagStore } from '@/store/tagTypeStore';
import { ref } from 'vue';
interface TagData {
    type: number;
    tagType: string;
}
// const tagType = ref('blog')
const typeData = ref<TagData>({ type: 0, tagType: 'comprehensive' })

const addTagType = useTagStore()
addTagType.addTag(typeData.value)
</script>

<template>
    <TheTopNav></TheTopNav>
    <RouterView></RouterView>
</template>

<style lang="scss" scoped></style>

<route lang="json">{
    "meta": {
        "title": "综合",
        "icon": "material-symbols-light:overview-key-outline",
        "thirdNavItems": [
            {
                "title": "热门",
                "path": "/community/comprehensive/hot",
                "icon": "i-mdi-file-document-multiple-outline"
            },
            {
                "title": "用户",
                "path": "/community/comprehensive/user",
                "icon": "i-mdi-file-document-multiple-outline"
            },
            {
                "title": "标签",
                "path": "/community/comprehensive/label/suggest",
                "icon": "i-mdi-file-document-multiple-outline"
            }
        ]
    }
}</route>
