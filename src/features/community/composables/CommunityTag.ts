import axios from "axios";
import { reactive } from "vue";
import { useRequest } from "@/composables/useRequest";

export default function () {
    const { data, error, loading, executeRequest } = useRequest();
    const hotTagList = []

    async function getHotTagList() {
        await executeRequest({ url: `/community_tag/hotTags`, method: 'get' })
        hotTagList.value = data.value.data
        console.log(hotTagList);
    }

    return {
        hotTagList,
        getHotTagList
    }
}