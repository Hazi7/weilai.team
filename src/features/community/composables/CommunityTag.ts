import axios from "axios";
import { ref } from "vue";
import { useRequest } from "@/composables/useRequest";
import type { ArticleList, Data } from "@/types/Community";
import { useTagStore } from "@/store/tagTypeStore";

interface TagData {
    data: string[];
}

interface TagTypeData {
    type: number;
    tagType: string;
}

interface UsageTagData {
    data: { [key: string]: number }[];
}

interface UseTagList {
    [key: string]: number
}

const tagStore = useTagStore();
const typeData = ref<TagTypeData>()


export default function () {
    const { data, error, loading, executeRequest } = useRequest();
    let hotTagList = ref<string[]>([])
    let allTagList = ref<string[]>([])
    let useTagList = ref<UseTagList[]>([]);
    let likeTagList = ref<string[]>([])
    const tagPostList = ref<ArticleList[]>([])
    const tagCloudList = ref<string[]>([])
    const type = ref<Number | string>()

    async function getTagCloudList() {
        await executeRequest({
            url: "/community_tag/getTagNames", method: "get"
        });
        const res = data.value as TagData;
        tagCloudList.value = res.data;
    }

    async function getHotTagList() {
        typeData.value = tagStore.tagType
        type.value = typeData.value.type
        console.log(typeData.value.type);
        if (type.value == 0) {
            type.value = ''
        }
        await executeRequest({ url: `/community_tag/hotTags?type=${type.value}`, method: 'get' })
        const res = data.value as TagData;
        likeTagList.value = res.data
    }

    async function getAllTagList() {
        await executeRequest({ url: `/community_tag/getTagNames`, method: 'get' })
        const res = data.value as TagData;
        allTagList.value = res.data
    }

    async function getUseTagList() {
        typeData.value = tagStore.tagType
        type.value = typeData.value.type
        console.log(typeData.value.type);
        if (type.value == 0) {
            type.value = ''
        }
        await executeRequest({ url: `/community_tag/UsageStatistics?type=${type.value}`, method: 'get' })
        const res = data.value as UsageTagData;
        useTagList.value = res.data
    }

    async function getRecommendTag() {
        typeData.value = tagStore.tagType
        type.value = typeData.value.type
        console.log(typeData.value.type);
        if (type.value == 0) {
            type.value = ''
        }
        await executeRequest({ url: `/community_tag/recommend?type=${type.value}`, method: 'get' })
        const res = data.value as TagData;
        hotTagList.value = res.data
    }

    async function getPostList(tag: string) {
        typeData.value = tagStore.tagType
        type.value = typeData.value.type
        console.log(typeData.value.type);
        if (type.value == 0) {
            type.value = ''
        }
        await executeRequest({ url: `/community_tag/relativePost?tagName=${tag}&type=${type.value}`, method: 'get' })
        const res = data.value as Data;
        // postList.splice(0, postList.length)
        console.log(res);
        if (res.code == 50016) {
            tagPostList.value = res.data.records
        } else if (res.code == 50017) {
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