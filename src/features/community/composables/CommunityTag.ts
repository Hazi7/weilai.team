import axios from "axios";
import { reactive } from "vue";
import { useRequest } from "@/composables/useRequest";

export default function () {
    const { data, error, loading, executeRequest } = useRequest();
    const hotTagList = reactive<string[]>([])
    const allTagList = reactive<string[]>([])
    const useTagList = reactive<{ tag_name: string; tag_usage_count: number }[]>([]);

    async function getHotTagList() {
        await executeRequest({ url: `/community_tag/hotTags`, method: 'get' })
        hotTagList.value = data.value.data
        console.log(hotTagList);
    }

    async function getAllTagList() {
        await executeRequest({ url: `/community_tag/getTagNames`, method: 'get' })
        allTagList.value = data.value.data
        console.log(allTagList);
    }

    async function getUseTagList() {
        await executeRequest({ url: `/community_tag/UsageStatistics`, method: 'get' })
        useTagList.value = data.value.data
        console.log(useTagList);
    }

    return {
        hotTagList,
        allTagList,
        useTagList,
        getAllTagList,
        getHotTagList,
        getUseTagList
    }
}