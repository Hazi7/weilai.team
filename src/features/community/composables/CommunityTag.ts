import { ref, watch } from "vue";
import { useRequest } from 'vue-request';
import apiClient from '@/api/axios';
// import { useRequest } from "@/composables/useRequest";
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
    data: {
        tagName: string;
        count: number;
    }[];
}

interface UseTagList {
    tagName: string;
    count: number;
}

const tagStore = useTagStore();
const typeData = ref<TagTypeData>()


export default function () {
    // const { data, executeRequest } = useRequest();
    const hotTagList = ref<string[]>([])
    const allTagList = ref<string[]>([])
    const useTagList = ref<UseTagList[]>([]);
    const likeTagList = ref<string[]>([])
    const tagPostList = ref<ArticleList[]>([])
    const tagCloudList = ref<string[]>([])
    const type = ref<number | string>()

    function getTagCloudList() {
        // await executeRequest({
        //     url: "/community_tag/getTagNames", method: "get"
        // });
        // const res = data.value as TagData;
        // tagCloudList.value = res.data;
        const getTagList = () => apiClient.get("/community_tag/getTagNames")
        const { data } = useRequest(getTagList)
        watch(data, () => {
            const res = data.value as TagData;
            tagCloudList.value = res.data
        })
    }

    function getHotTagList() {
        typeData.value = tagStore.tagType
        type.value = typeData.value.type
        console.log(typeData.value.type);
        if (type.value == 0) {
            type.value = ''
        }
        // await executeRequest({ url: `/community_tag/hotTags?type=${type.value}`, method: 'get' })
        // const res = data.value as TagData;
        // likeTagList.value = res.data
        const getTagList = () => apiClient.get(`/community_tag/hotTags?type=${type.value}`)
        const { data } = useRequest(getTagList)
        watch(data, () => {
            const res = data.value as TagData;
            likeTagList.value = res.data
        })
    }

    function getAllTagList() {
        // await executeRequest({ url: `/community_tag/getTagNames`, method: 'get' })
        // const res = data.value as TagData;
        // allTagList.value = res.data
        const getTagList = () => apiClient.get(`/community_tag/getTagNames`)
        const { data } = useRequest(getTagList)
        watch(data, () => {
            const res = data.value as TagData;
            allTagList.value = res.data
        })
    }

    function getUseTagList() {
        typeData.value = tagStore.tagType
        type.value = typeData.value.type
        console.log(typeData.value.type);
        if (type.value == 0) {
            type.value = ''
        }
        // await executeRequest({ url: `/community_tag/UsageStatistics?type=${type.value}`, method: 'get' })
        // const res = data.value as UsageTagData;
        // useTagList.value = res.data
        const getTagList = () => apiClient.get(`/community_tag/UsageStatistics?type=${type.value}`)
        const { data } = useRequest(getTagList)
        watch(data, () => {
            const res = data.value as UsageTagData;
            useTagList.value = res.data
        })
    }

    function getRecommendTag() {
        typeData.value = tagStore.tagType
        type.value = typeData.value.type
        console.log(typeData.value.type);
        if (type.value == 0) {
            type.value = ''
        }
        // await executeRequest({ url: `/community_tag/recommend?type=${type.value}`, method: 'get' })
        // const res = data.value as TagData;
        // hotTagList.value = res.data
        const getTagList = () => apiClient.get(`/community_tag/recommend?type=${type.value}`)
        const { data } = useRequest(getTagList)
        watch(data, () => {
            const res = data.value as TagData;
            hotTagList.value = res.data
        })
    }

    async function getPostList(tag: string) {
        typeData.value = tagStore.tagType
        type.value = typeData.value.type
        console.log(typeData.value.type);
        if (type.value == 0) {
            type.value = ''
        }
        // await executeRequest({ url: `/community_tag/relativePost?tagName=${tag}&type=${type.value}`, method: 'get' })
        // const res = data.value as Data;
        // // postList.splice(0, postList.length)
        // console.log(res);
        // if (res.code == 50016) {
        //     tagPostList.value = res.data.records
        // } else if (res.code == 50017) {
        //     tagPostList.value = []
        // }
        const getTagList = () => apiClient.get(`/community_tag/relativePost?tagName=${tag}&type=${type.value}`)
        const { data } = useRequest(getTagList)
        watch(data, () => {
            const res = data.value as Data;
            console.log(res);
            if (res.code == 50016) {
                tagPostList.value = res.data.records
            } else if (res.code == 50017) {
                tagPostList.value = []
            }
        })
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