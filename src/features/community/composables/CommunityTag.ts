import axios from "axios";
import { ref } from "vue";
import { useRequest } from "@/composables/useRequest";
import type { ArticleList, Data } from "@/types/Community";

interface TagData {
    data: string[];
}

interface UsageTagData {
    data: { tag_name: string; tag_usage_count: number }[];
}

export default function () {
    const { data, error, loading, executeRequest } = useRequest();
    let hotTagList = ref<string[]>([])
    let allTagList = ref<string[]>([])
    let useTagList = ref<{ tag_name: string; tag_usage_count: number }[]>([]);
    let likeTagList = ref<string[]>([])
    const tagPostList = ref<ArticleList[]>([])
    const tagCloudList = ref<string[]>([])

    async function getTagCloudList() {
        await executeRequest({
            url: "/community_tag/getTagNames", method: "get"
        });
        const res = data.value as TagData;
        tagCloudList.value = res.data;
    }

    async function getHotTagList() {
        await executeRequest({ url: `/community_tag/hotTags`, method: 'get' })
        const res = data.value as TagData;
        hotTagList.value = res.data
    }

    async function getAllTagList() {
        await executeRequest({ url: `/community_tag/getTagNames`, method: 'get' })
        const res = data.value as TagData;
        allTagList.value = res.data
    }

    async function getUseTagList() {
        await executeRequest({ url: `/community_tag/UsageStatistics`, method: 'get' })
        const res = data.value as UsageTagData;
        useTagList.value = res.data
    }

    async function getRecommendTag() {
        await executeRequest({ url: `/community_tag/recommend`, method: 'get' })
        const res = data.value as TagData;
        likeTagList.value = res.data
    }

    async function getPostList(tag: string) {
        await executeRequest({ url: `/community_tag/relativePost?tagName=${tag}`, method: 'get' })
        const res = data.value as Data;
        // postList.splice(0, postList.length)
        if (res.code == 50016) {
            tagPostList.value = []
        } else {
            tagPostList.value = res.data.records
        }
    }

    return {
        tagCloudList,
        hotTagList,
        allTagList,
        useTagList,
        likeTagList,
        tagPostList,
        getTagCloudList,
        getPostList,
        getRecommendTag,
        getAllTagList,
        getHotTagList,
        getUseTagList
    }
}