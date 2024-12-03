import axios from "axios";
import { ref } from "vue";
import { useRequest } from "@/composables/useRequest";
import type { ArticleList, Data } from "@/types/Community";

interface TagData {
    data: string[];
}

interface UsageTagData {
    data: { [key: string]: number }[];
}

interface UseTagList {
    [key: string]: number
}



export default function () {
    const { data, error, loading, executeRequest } = useRequest();
    let hotTagList = ref<string[]>([])
    let allTagList = ref<string[]>([])
    let useTagList = ref<UseTagList[]>([]);
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

    async function getHotTagList(type: number) {
        await executeRequest({ url: `/community_tag/findHotTagsByTagUses?type=${type}`, method: 'get' })
        const res = data.value as TagData;
        hotTagList.value = res.data
    }

    async function getAllTagList() {
        await executeRequest({ url: `/community_tag/getTagNames`, method: 'get' })
        const res = data.value as TagData;
        allTagList.value = res.data
    }

    async function getUseTagList(type: number) {
        await executeRequest({ url: `/community_tag/UsageStatistics?type=${type}`, method: 'get' })
        const res = data.value as UsageTagData;
        useTagList.value = res.data
    }

    async function getRecommendTag(type: number) {
        await executeRequest({ url: `/community_tag/recommend?type=${type}`, method: 'get' })
        const res = data.value as TagData;
        likeTagList.value = res.data
    }

    async function getPostList(tag: string, type: number) {
        await executeRequest({ url: `/community_tag/relativePost?tagName=${tag}&type=${type}`, method: 'get' })
        const res = data.value as Data;
        // postList.splice(0, postList.length)
        console.log(res);
        if (res.code == 50016) {
            tagPostList.value = res.data.records
        } else if (res.code == 50016) {
            tagPostList.value = []
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